"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { NotificationLevel } from "@/types/Notification";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  serviceId: number;
};

function ProviderConnector({ serviceId }: Props) {
  const [levels, setLevels] = useState<NotificationLevel[]>(["none"]);

  const router = useRouter();

  const changeLevel = (active: CheckedState, level: NotificationLevel) => {
    if (active) {
      setLevels((t) => t.concat(level));
    } else {
      setLevels((t) => t.filter((i) => i !== level));
    }
  };

  const redirectURLSlack = new URL(
    "https://notify-me.vercel.app/api/callback/slack"
  );
  redirectURLSlack.searchParams.append("levels", levels.join("-"));
  redirectURLSlack.searchParams.append("service", serviceId.toString());

  const redirectURLTrello = new URL(
    "http://localhost:3000/trello/redirect"
    //`https://notify-me.vercel.app/api/callback/trello`
  );
  redirectURLTrello.searchParams.append("levels", levels.join("-"));
  redirectURLTrello.searchParams.append("service", serviceId.toString());

  const redirectURLDiscord = new URL("http://localhost:3000/discord");
  //redirectURLDiscord.searchParams.append("levels", levels.join("-"));
  //redirectURLDiscord.searchParams.append("service", serviceId.toString());

  //?client_id=1244311670957015142&permissions=3088&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&scope=bot+guilds
  const discordUrl = new URL("https://discord.com/oauth2/authorize");
  discordUrl.searchParams.append("client_id", "1244311670957015142");
  discordUrl.searchParams.append("permissions", "3088");
  discordUrl.searchParams.append("response_type", "token");
  discordUrl.searchParams.append("redirect_uri", redirectURLDiscord.toString());
  discordUrl.searchParams.append(
    "state",
    encodeURIComponent(
      JSON.stringify({
        levels: levels.join("-"),
        serviceId,
      })
    )
  );
  //discordUrl.searchParams.append("scope", "bot+guilds");

  const discordUrlFormatted = `${discordUrl.toString()}&scope=bot+guilds`;

  const slackUrl = new URL("https://slack.com/oauth/v2/authorize");
  slackUrl.searchParams.append("scope", "incoming-webhook");
  slackUrl.searchParams.append("user_scope", "");
  slackUrl.searchParams.append(
    "client_id",
    process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!
  );
  slackUrl.searchParams.append("redirect_uri", redirectURLSlack.toString());

  const trelloUrl = new URL("https://trello.com/1/authorize");
  trelloUrl.searchParams.append("name", "NotifyMeToken");
  trelloUrl.searchParams.append("scope", "write,read");
  trelloUrl.searchParams.append("response_type", "token");
  trelloUrl.searchParams.append(
    "key",
    process.env.NEXT_PUBLIC_TRELLO_CLIENT_API_KEY!
  );
  trelloUrl.searchParams.append("expiration", "never");
  trelloUrl.searchParams.append("return_url", redirectURLTrello.toString());

  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <div className="gap-4 grid grid-cols-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Provider</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add provider</DialogTitle>
              <DialogDescription>
                Add a provider that we will send notifications to
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-start gap-8">
                <Label>Level</Label>
                <div className="flex flex-col justify-center items-start gap-4">
                  <div className="flex flex-row gap-4">
                    <Checkbox
                      checked={levels.includes("none")}
                      onCheckedChange={(s) => {
                        changeLevel(s, "none");
                      }}
                    />
                    <Label>None</Label>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Checkbox
                      checked={levels.includes("info")}
                      onCheckedChange={(s) => {
                        changeLevel(s, "info");
                      }}
                    />
                    <Label>Info</Label>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Checkbox
                      checked={levels.includes("warning")}
                      onCheckedChange={(s) => {
                        changeLevel(s, "warning");
                      }}
                    />
                    <Label>Warning</Label>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Checkbox
                      checked={levels.includes("error")}
                      onCheckedChange={(s) => {
                        changeLevel(s, "error");
                      }}
                    />
                    <Label>Error</Label>
                  </div>
                </div>
              </div>
              <Label>
                Select the levels this provider rule should apply to
              </Label>
              <Separator className="my-4" />
              <a target="_blank" href={slackUrl.toString()}>
                <img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                />
              </a>
              <Link target="_blank" href={trelloUrl}>
                <Button
                  variant={"outline"}
                  className="flex flex-row gap-4 px-2"
                >
                  <img
                    src="https://user-images.githubusercontent.com/13432607/29981988-82cec158-8f58-11e7-9f26-473079c2a9b1.png"
                    height={36}
                    width={36}
                    alt="Add to Trello"
                  />
                  <p>
                    Add to <b>Trello</b>
                  </p>
                </Button>
              </Link>
              <Link target="_blank" href={discordUrlFormatted}>
                <Button
                  variant={"outline"}
                  className="flex flex-row gap-4 px-2"
                >
                  <img
                    src="data:image/png;base64,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"
                    height={36}
                    width={36}
                    alt="Add to Trello"
                    className="p-[2px] rounded-lg overflow-hidden"
                  />
                  <p>
                    Add to <b>Discord</b>
                  </p>
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant={"secondary"} onClick={() => router.refresh()}>
          Reload providers
        </Button>
      </div>
    </div>
  );
}

export default ProviderConnector;
