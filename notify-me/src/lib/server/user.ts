"use server";

import { cookies } from "next/headers";
import { createClient } from "../supabase";
import { PublicUser } from "@/types/User";

export async function GetProjectUsers(
  projectId: number
): Promise<PublicUser[]> {
  const supabase = createClient();

  const usersIds = await supabase
    .from("notifyme_project_users")
    .select("user")
    .eq("project", projectId);
  if (!usersIds.data) return [];

  const usersData = await supabase
    .from("notifyme_users")
    .select("*")
    .in(
      "id",
      usersIds.data.map((i) => i.user)
    );

  if (!usersData.data) return [];

  return usersData.data.map((user) => ({
    email: user.email,
    icon: user.image,
    id: user.id,
    name: user.name,
  }));
}
