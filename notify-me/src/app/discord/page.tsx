"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscordChannel } from "@/types/Discord";
import { LoaderCircle, Unplug } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [channels, setChannels] = useState<DiscordChannel[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("");

  const getChannels = async (guildId: string) => {
    const response = await fetch(`/api/discord/guilds?guildId=${guildId}`);
    if (response.status !== 200) {
      setError("Could not load channels");
      return;
    }

    const channels: DiscordChannel[] = await response.json();
    setChannels(channels);
  };

  const connect = async () => {
    setLoading(true);

    const hash = window.location.hash;

    const params = new URLSearchParams(hash.substring(1));

    await fetch(
      `/api/callback/discord?channel=${selectedChannel}&state=${params.get(
        "state"
      )}`,
      {
        method: "POST",
      }
    );

    alert("The connection has been made, closing this window");

    window.close();
  };

  useEffect(() => {
    const hash = window.location.hash;

    const params = new URLSearchParams(hash.substring(1));

    const guildId = params.get("guild_id");

    if (!guildId) {
      setError("Authentication with discord failed");
      return;
    }

    getChannels(guildId);
  }, []);

  if (error === undefined && channels.length === 0) {
    return <p>Loading discord boards</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Connect NotifyMe to a Discord channel</CardTitle>
          <CardDescription>
            Select a channel below and click connect when you are done
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Select Discord channel</Label>
            <Select
              value={selectedChannel}
              onValueChange={(a) => {
                setSelectedChannel(a);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {channels.map((i) => (
                  <SelectItem value={i.id}>{i.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button
              disabled={selectedChannel === "" || loading}
              className="flex flex-row justify-center items-center gap-4"
              onClick={connect}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Unplug /> Connect
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
