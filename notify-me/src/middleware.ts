import { NextRequest } from "next/server";
import { UpdateSession } from "./lib/server/auth";

export async function middleware() {
  const response = await UpdateSession();
  return response;
}
