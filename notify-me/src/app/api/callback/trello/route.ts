import { UserHasServiceAccess } from "@/lib/server/service";
import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);

  const list = url.searchParams.get("list");
  const levels = url.searchParams.get("levels");
  const serviceId = parseInt(url.searchParams.get("service") ?? "");
  const token = url.searchParams.get("token");

  if (!(await UserHasServiceAccess(serviceId))) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!list || !levels || !serviceId || isNaN(serviceId) || !token) {
    return NextResponse.json({}, { status: 500 });
  }

  const supabase = createClient();

  const trelloURL = `https://api.trello.com/1/cards?idList=${list}&token=${token}`;

  await supabase.from("notifyme_providers").insert({
    levels: levels,
    provider: "Trello",
    service: serviceId,
    url: trelloURL,
  });

  return NextResponse.json({});
};
