import { cookies } from "next/headers";
import {
  SignAccessToken,
  VerifyAccessToken,
  VerifyRefreshToken,
} from "./token";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../supabase";
import { PublicUser } from "@/types/User";
import { redirect } from "next/navigation";

const COOKIE_ACCESS_TOKEN = "accessToken";
const COOKIE_REFRESH_TOKEN = "refreshToken";

function GetCookieAccessToken() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_ACCESS_TOKEN);

  return token;
}

function GetCookieRefreshToken() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_REFRESH_TOKEN);

  return token;
}

export async function GetSessionRedirect() {
  const token = GetCookieAccessToken();
  if (!token) redirect("/signin");
  const userId = await VerifyAccessToken(token.value);
  if (!userId) redirect("/signin");

  return parseInt(userId);
}

export async function GetSession() {
  const token = GetCookieAccessToken();
  if (!token) return undefined;
  const userId = await VerifyAccessToken(token.value);
  if (!userId) return undefined;

  return parseInt(userId);
}

export const BlockNoAuth = <T>(
  callback: (request: NextRequest, userId: number) => Promise<T>
) => {
  return async (request: NextRequest) => {
    const token = GetCookieAccessToken();
    if (!token)
      return NextResponse.json(
        { error: "Missing accessToken i cookies" },
        { status: 400 }
      );

    const userId = await VerifyAccessToken(token.value);
    if (!userId) {
      return NextResponse.json({ error: "JWT verify failed" }, { status: 401 });
    }

    return await callback(request, parseInt(userId));
  };
};

export async function UpdateSession() {
  const refreshToken = GetCookieRefreshToken();
  if (!refreshToken) return undefined;
  const userId = await VerifyRefreshToken(refreshToken.value);
  if (!userId) return undefined;

  const accessToken = await SignAccessToken(userId);

  if (!accessToken) return undefined;

  const response = NextResponse.next();
  response.cookies.set({
    name: COOKIE_ACCESS_TOKEN,
    value: accessToken,
    httpOnly: true,
  });

  return response;
}

export function LogOut() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_ACCESS_TOKEN);
  cookieStore.delete(COOKIE_REFRESH_TOKEN);
}

export async function SignIn(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken);
  cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken);
}

export async function GetUser() {
  const userId = await GetSession();
  if (!userId) return undefined;

  const supabase = createClient();

  const userData = await supabase
    .from("notifyme_users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!userData.data) return undefined;

  const user: PublicUser = {
    email: userData.data.email,
    icon: userData.data.image,
    id: userId,
    name: userData.data.name,
  };

  return user;
}
