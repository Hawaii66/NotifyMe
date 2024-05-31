import { SignIn } from "@/lib/server/auth";
import { SignAccessToken, SignRefreshToken } from "@/lib/server/token";
import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = new URL(request.url).searchParams;
  const code = params.get("code");

  if (!code)
    return NextResponse.redirect(new URL("/signin/failed", request.url));

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const body = await tokenResponse.text();

  const token = body.split("=")[1].split("&")[0];

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      "User-Agent": "DirectAlert",
      Authorization: `Bearer ${token}`,
    },
  });

  const user: {
    id: number;
    avatar_url: string;
    name: string;
    email: string;
  } = await userResponse.json();

  const supabase = createClient();

  const exist = await supabase
    .from("notifyme_users")
    .select("id")
    .eq("github_id", user.id)
    .single();
  var userId;
  if (exist.data) {
    userId = exist.data.id;
  } else {
    const userIdResponse = await supabase
      .from("notifyme_users")
      .insert({
        email: user.email,
        image: user.avatar_url,
        name: user.name,
        github_id: user.id,
      })
      .select("id");

    if (!userIdResponse.data) {
      return NextResponse.redirect(new URL("/signin/failed", request.url));
    }

    userId = userIdResponse.data[0].id;
  }

  const accessToken = await SignAccessToken(userId.toString());
  const refreshToken = await SignRefreshToken(userId.toString());

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/signin/failed", request.url));
  }

  await SignIn(accessToken, refreshToken);

  return NextResponse.redirect(new URL(`/dashboard`, request.url));
};
