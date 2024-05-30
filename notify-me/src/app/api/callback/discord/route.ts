import { UserHasServiceAccess } from "@/lib/server/service";
import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);

  const channel = url.searchParams.get("channel");
  const state: { levels: string; serviceId: number } = JSON.parse(
    url.searchParams.get("state") ?? ""
  );

  if (!(await UserHasServiceAccess(state.serviceId))) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!channel || !state) return NextResponse.json({}, { status: 500 });

  const supabase = createClient();

  const discordUrl = `https://discord.com/api/channels/${channel}/messages`;

  await supabase.from("notifyme_providers").insert({
    levels: state.levels,
    provider: "Discord",
    service: state.serviceId,
    url: discordUrl,
  });

  return NextResponse.json({});
};
