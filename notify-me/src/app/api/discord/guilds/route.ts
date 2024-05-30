import { DiscordChannel } from "@/types/Discord";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const guildId = new URL(request.url).searchParams.get("guildId");

  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}/channels`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  );

  const data: { id: string; name: string; type: number }[] =
    await response.json();

  const channels: DiscordChannel[] = data
    .filter((i) => i.type === 0)
    .map((i) => ({
      name: i.name,
      id: i.id,
    }));

  return NextResponse.json(channels);
};
