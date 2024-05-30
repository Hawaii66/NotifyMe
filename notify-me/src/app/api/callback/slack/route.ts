import { UserHasServiceAccess } from "@/lib/server/service";
import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const levels = url.searchParams.get("levels");
  const serviceId = parseInt(url.searchParams.get("service") ?? "");
  const code = url.searchParams.get("code");

  if (!(await UserHasServiceAccess(serviceId))) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!levels || !serviceId || isNaN(serviceId) || !code)
    return NextResponse.json({}, { status: 400 });

  const redirectURLSlack = new URL(
    "https://notify-me.vercel.app/api/callback/slack"
  );
  redirectURLSlack.searchParams.append("levels", levels);
  redirectURLSlack.searchParams.append("service", serviceId.toString());

  const formData: { [key: string]: string } = {
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID ?? "",
    client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
    code: code,
    redirect_uri: redirectURLSlack.toString(),
  };
  const formBody = Object.keys(formData)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
    )
    .join("&");

  const response = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (response.status !== 200) {
    const text = await response.json();
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  const slackUrl: {
    incoming_webhook: {
      url: string;
    };
  } = await response.json();

  const supabase = createClient();

  await supabase.from("notifyme_providers").insert({
    levels: levels,
    provider: "Slack",
    service: serviceId,
    url: slackUrl.incoming_webhook.url,
  });

  return NextResponse.json({});
};
