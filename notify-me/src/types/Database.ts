export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Admins: {
        Row: {
          created_at: string
          id: string | null
        }
        Insert: {
          created_at?: string
          id?: string | null
        }
        Update: {
          created_at?: string
          id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Admins_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Articles: {
        Row: {
          category: string
          created_at: string
          height: number
          id: number
          image: string
          title: string
          width: number
          wikipedia: string
        }
        Insert: {
          category: string
          created_at?: string
          height: number
          id?: number
          image: string
          title: string
          width: number
          wikipedia: string
        }
        Update: {
          category?: string
          created_at?: string
          height?: number
          id?: number
          image?: string
          title?: string
          width?: number
          wikipedia?: string
        }
        Relationships: []
      }
      ArticleTopics: {
        Row: {
          article: number
          created_at: string
          id: number
          topic: number
        }
        Insert: {
          article: number
          created_at?: string
          id?: number
          topic: number
        }
        Update: {
          article?: number
          created_at?: string
          id?: number
          topic?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_ArticleTopics_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "random_article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      FollowedCategories: {
        Row: {
          category: string
          created_at: string
          id: number
          user: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          user: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "FollowedCategories_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      FollowedTopics: {
        Row: {
          created_at: string
          id: number
          topic: number
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          topic: number
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          topic?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "FollowedTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FollowedTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FollowedTopics_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Likes: {
        Row: {
          article: number
          created_at: string
          id: number
          user: string
        }
        Insert: {
          article: number
          created_at?: string
          id?: number
          user: string
        }
        Update: {
          article?: number
          created_at?: string
          id?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Likes_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Likes_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "random_article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Likes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_notifications: {
        Row: {
          completed: boolean
          created_at: string
          data: string | null
          description: string | null
          id: number
          level: string
          service: number
          service_secret_creator: string
          title: string | null
        }
        Insert: {
          completed: boolean
          created_at?: string
          data?: string | null
          description?: string | null
          id?: number
          level: string
          service: number
          service_secret_creator: string
          title?: string | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          data?: string | null
          description?: string | null
          id?: number
          level?: string
          service?: number
          service_secret_creator?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifyme_notifications_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "notifyme_services"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_pending_notifications: {
        Row: {
          created_at: string
          id: number
          notfication: number
        }
        Insert: {
          created_at?: string
          id?: number
          notfication: number
        }
        Update: {
          created_at?: string
          id?: number
          notfication?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifyme_pending_notifications_notfication_fkey"
            columns: ["notfication"]
            isOneToOne: false
            referencedRelation: "notifyme_notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_project: {
        Row: {
          color: string
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          color: string
          created_at?: string
          description: string
          id?: number
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      notifyme_project_users: {
        Row: {
          created_at: string
          id: number
          project: number
          user: number
        }
        Insert: {
          created_at?: string
          id?: number
          project: number
          user: number
        }
        Update: {
          created_at?: string
          id?: number
          project?: number
          user?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifyme_project_users_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "notifyme_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifyme_project_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "notifyme_users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_providers: {
        Row: {
          created_at: string
          id: number
          levels: string
          provider: string
          service: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          levels: string
          provider: string
          service: number
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          levels?: string
          provider?: string
          service?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifyme_providers_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "notifyme_services"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_service_secrets: {
        Row: {
          created_at: string
          id: number
          name: string
          secret: string
          service: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          secret: string
          service: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          secret?: string
          service?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_secrets_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "notifyme_services"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_services: {
        Row: {
          color: string
          created_at: string
          description: string
          id: number
          name: string
          project: number
        }
        Insert: {
          color: string
          created_at?: string
          description: string
          id?: number
          name: string
          project: number
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
          project?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifyme_services_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "notifyme_project"
            referencedColumns: ["id"]
          },
        ]
      }
      notifyme_users: {
        Row: {
          created_at: string
          email: string
          github_id: number
          id: number
          image: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          github_id: number
          id?: number
          image: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          github_id?: number
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      Report: {
        Row: {
          article: number | null
          created_at: string
          id: number
          reason: string
          user: string | null
        }
        Insert: {
          article?: number | null
          created_at?: string
          id?: number
          reason: string
          user?: string | null
        }
        Update: {
          article?: number | null
          created_at?: string
          id?: number
          reason?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Report_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Report_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "random_article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Report_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Tonality: {
        Row: {
          article: number | null
          created_at: string
          id: number
          text: string
          type: string
        }
        Insert: {
          article?: number | null
          created_at?: string
          id?: number
          text: string
          type: string
        }
        Update: {
          article?: number | null
          created_at?: string
          id?: number
          text?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Tonality_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Tonality_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "random_article"
            referencedColumns: ["id"]
          },
        ]
      }
      Topics: {
        Row: {
          created_at: string
          id: number
          topic: string
        }
        Insert: {
          created_at?: string
          id?: number
          topic: string
        }
        Update: {
          created_at?: string
          id?: number
          topic?: string
        }
        Relationships: []
      }
      TrendingTopics: {
        Row: {
          created_at: string
          id: number
          topic: number
        }
        Insert: {
          created_at?: string
          id?: number
          topic: number
        }
        Update: {
          created_at?: string
          id?: number
          topic?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_TrendingTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_TrendingTopics_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      TrendingTopicsInCategories: {
        Row: {
          category: string
          created_at: string
          id: number
          topic: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          topic: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          topic?: number
        }
        Relationships: [
          {
            foreignKeyName: "TrendingTopicsInCategories_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TrendingTopicsInCategories_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          hashed_password: string
          id: string
          image: string
          name: string
        }
        Insert: {
          created_at?: string
          email?: string
          hashed_password?: string
          id?: string
          image?: string
          name?: string
        }
        Update: {
          created_at?: string
          email?: string
          hashed_password?: string
          id?: string
          image?: string
          name?: string
        }
        Relationships: []
      }
      Waitlist: {
        Row: {
          created_at: string
          id: number
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "Waitlist_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      categories: {
        Row: {
          category: string | null
        }
        Relationships: []
      }
      random_article: {
        Row: {
          category: string | null
          id: number | null
          type: string | null
        }
        Relationships: []
      }
      random_topic_article: {
        Row: {
          article: number | null
          name: string | null
          topicid: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ArticleTopics_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_article_fkey"
            columns: ["article"]
            isOneToOne: false
            referencedRelation: "random_article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_topic_fkey"
            columns: ["topicid"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ArticleTopics_topic_fkey"
            columns: ["topicid"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_topic_articles: {
        Row: {
          id: number | null
          num_articles: number | null
          topic_name: string | null
        }
        Relationships: []
      }
      trendingcategorieswithtopics: {
        Row: {
          articles: number | null
          category: string | null
          id: number | null
          topic: string | null
          topicid: number | null
        }
        Relationships: [
          {
            foreignKeyName: "TrendingTopicsInCategories_topic_fkey"
            columns: ["topicid"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TrendingTopicsInCategories_topic_fkey"
            columns: ["topicid"]
            isOneToOne: false
            referencedRelation: "trending_topic_articles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
