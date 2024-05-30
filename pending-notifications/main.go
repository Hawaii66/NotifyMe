package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/nedpals/supabase-go"
)

type SendProvider interface {
	Send(notification Notification, service Service)
}

type SlackProvider struct {
	SendProvider
	url string
}

type DiscordProvider struct {
	SendProvider
	token string
	url   string
}

type TrelloProvider struct {
	SendProvider
	key string
	url string
}

func NewTrelloProvider(provider Provider) TrelloProvider {
	return TrelloProvider{
		key: os.Getenv("TRELLO_CLIENT_API_KEY"),
		url: provider.Url,
	}
}

func NewSlacProvider(provider Provider) SlackProvider {
	return SlackProvider{
		url: provider.Url,
	}
}

func NewDiscordProvider(provider Provider) DiscordProvider {
	return DiscordProvider{
		token: os.Getenv("DISCORD_BOT_TOKEN"),
		url:   provider.Url,
	}
}

func (provider TrelloProvider) Send(notification Notification, service Service) {
	title := FormatTitle(notification, service)
	text := FormatNotification(notification, service)

	url := fmt.Sprintf("%s&key=%s&name=%s&desc=%s", provider.url, provider.key, url.QueryEscape(title), url.QueryEscape(text))

	request, err2 := http.NewRequest("POST", url, bytes.NewBuffer(make([]byte, 0)))

	if err2 != nil {
		log.Fatalln("Trello request failed", err2)
		return
	}

	client := &http.Client{}

	resp, err3 := client.Do(request)

	if err3 != nil {
		log.Fatalln("Trello request send failed", err3)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Fatalln("Failed to send trello notification", notification)
	}
}

func (provider SlackProvider) Send(notification Notification, service Service) {
	text := FormatNotification(notification, service)
	body, err := json.Marshal(map[string]string{
		"text": text,
	})

	if err != nil {
		log.Fatalln("Slack marshal failed", err)
		return
	}

	responseBody := bytes.NewBuffer(body)

	request, err2 := http.NewRequest("POST", provider.url, responseBody)

	if err2 != nil {
		log.Fatalln("Slack request failed", err2)
		return
	}

	request.Header.Set("Content-Type", "application/json")

	client := &http.Client{}

	resp, err3 := client.Do(request)

	if err3 != nil {
		log.Fatalln("Slack request send failed", err3)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Fatalln("Failed to send slack notification", notification)
	}
}

func (provider DiscordProvider) Send(notification Notification, service Service) {
	text := FormatNotification(notification, service)

	body, err := json.Marshal(map[string]string{
		"content": text,
	})

	if err != nil {
		log.Fatalln("Discord marschal failed", err)
		return
	}

	responseBody := bytes.NewBuffer(body)

	request, err2 := http.NewRequest("POST", provider.url, responseBody)

	if err2 != nil {
		log.Fatalln("Discord request failed", err2)
		return
	}

	authToken := fmt.Sprintf("Bot %s", provider.token)

	request.Header.Set("Authorization", authToken)
	request.Header.Set("Content-Type", "application/json")

	client := &http.Client{}

	resp, err3 := client.Do(request)

	if err3 != nil {
		log.Fatalln("Discord request send failed", err3)
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Fatalln("Failed to send discord notification", notification)
	}
}

func FormatNotification(notification Notification, service Service) string {
	return fmt.Sprintf("Notification from %s with level: %s\n\nTitle: %s\nDescription: %s\nData: %s\n\nSent from NotifyMe", service.Name, notification.Level, notification.Title, notification.Description, notification.Data)
}

func FormatTitle(notification Notification, service Service) string {
	return fmt.Sprintf("From %s with level %s", service.Name, notification.Level)
}

func BuildProviders(providers []Provider) []SendProvider {
	var send []SendProvider
	for i := 0; i < len(providers); i++ {
		provider := providers[i]
		switch provider.Provider {
		case "Discord":
			send = append(send, NewDiscordProvider(provider))
		case "Trello":
			send = append(send, NewTrelloProvider(provider))
		case "Slack":
			send = append(send, NewSlacProvider(provider))
		default:
			log.Fatalln("Unknown provider", provider)

		}
	}

	return send
}

func LoadNotification(id int, supabase supabase.Client) (Notification, []Provider, Service) {
	var notification Notification

	err := supabase.DB.From("notifyme_notifications").Select("*").Single().Eq("id", strconv.Itoa(id)).Execute(&notification)
	if err != nil {
		log.Fatalln("Couldn't load notification", id, err)
		panic(err)
	}

	var service Service
	err2 := supabase.DB.From("notifyme_services").Select("*").Single().Eq("id", strconv.Itoa(notification.Service)).Execute(&service)
	if err2 != nil {
		log.Fatalln("Couldn't load service", notification, err2)
		panic(err2)
	}

	var providers []Provider
	err3 := supabase.DB.From("notifyme_providers").Select("*").Eq("service", strconv.Itoa(notification.Service)).Execute(&providers)

	if err3 != nil {
		log.Fatalln("Couldn't load providers", notification, service, err3)
		panic(err3)
	}

	return notification, FilterProviders(notification, providers), service
}

func FilterProviders(notification Notification, providers []Provider) []Provider {
	var filteredProviders []Provider
	for i := 0; i < len(providers); i++ {
		levels := strings.Split(providers[i].Levels, "-")
		for j := 0; j < len(levels); j++ {
			if levels[j] == notification.Level {
				filteredProviders = append(filteredProviders, providers[i])
			}
		}
	}

	return filteredProviders
}

func SendNotificationToProviders(notification Notification, providers []SendProvider, service Service) {
	for i := 0; i < len(providers); i++ {
		fmt.Println("Sending notification", notification.Id, service.Id)
		providers[i].Send(notification, service)
	}
}

func SendNotification(notificationId int, supabase supabase.Client) {
	notification, providers, service := LoadNotification(notificationId, supabase)

	sendProviders := BuildProviders(providers)

	SendNotificationToProviders(notification, sendProviders, service)
}

func GetPendingNotifications(count int, supabase supabase.Client, channel chan int) int {
	var pending []PendingNotification
	err := supabase.DB.From("notifyme_pending_notifications").Select("*").Limit(count).Execute(&pending)

	if err != nil {
		log.Fatalln("Couldn't load pending notifications", err, count)
		panic(err)
	}

	var deleteIds []string
	for i := 0; i < len(pending); i++ {
		deleteIds = append(deleteIds, strconv.Itoa(pending[i].Id))
		id := pending[i].Notification
		channel <- id
	}

	var t []any
	err2 := supabase.DB.From("notifyme_pending_notifications").Delete().In("id", deleteIds).Execute(&t)

	if err2 != nil {
		log.Fatalln("Couldn't delete pending", err2, pending)
		panic(err2)
	}

	return len(pending)
}

func ProcessNotificationChannel(supabase supabase.Client, channel <-chan int, id int) {
	for {
		val, ok := <-channel
		if !ok {
			return
		}

		SendNotification(val, supabase)
		fmt.Printf("Notification sent with id: %d from processing: %d\n", val, id)
	}
}

type PendingNotification struct {
	Id           int `json:"id"`
	Notification int `json:"notfication"`
}

type Notification struct {
	Id          int    `json:"id"`
	Data        string `json:"data"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Level       string `json:"level"`
	Service     int    `json:"service"`
}

type Provider struct {
	Id       int    `json:"id"`
	Provider string `json:"provider"`
	Levels   string `json:"levels"`
	Url      string `json:"url"`
}

type Service struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

var processChannel = make(chan int, 100)

func main() {
	godotenv.Load()

	SUPABASE_URL := os.Getenv("SUPABASE_URL")
	SUPABASE_ANON_KEY := os.Getenv("SUPABASE_ANON_KEY")

	supabase := supabase.CreateClient(SUPABASE_URL, SUPABASE_ANON_KEY)

	for i := 0; i < 10; i++ {
		go ProcessNotificationChannel(*supabase, processChannel, i)
	}

	go func() {
		for {
			if len(processChannel) < 50 {
				fetched := GetPendingNotifications(10, *supabase, processChannel)
				if fetched == 0 {
					time.Sleep(time.Second * 3)
				}
			}
		}
	}()

	fmt.Println("Starting go server")

	r := mux.NewRouter()

	port := os.Getenv("PORT")
	url := "0.0.0.0:" + port

	server := &http.Server{
		Addr:         url,
		Handler:      r,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	fmt.Println("Server started on url: http://" + url)
	err := server.ListenAndServe()

	if err != nil {
		panic(err)
	}
}
