"use server";

import { Provider } from "@/types/Provider";
import { createClient } from "../supabase";
import { NotificationLevel } from "@/types/Notification";

export async function GetProviders(serviceId: number): Promise<Provider[]> {
  const supabase = createClient();

  const providersData = await supabase
    .from("notifyme_providers")
    .select("*")
    .eq("service", serviceId);

  if (!providersData.data) return [];

  return providersData.data.map((i) => ({
    levels: i.levels.split("-") as NotificationLevel[],
    provider: i.provider,
    serviceId: serviceId,
    url: i.url,
    id: i.id,
  }));
}

export async function DeleteProvider(providerId: number) {
  const supabase = createClient();

  await supabase.from("notifyme_providers").delete().eq("id", providerId);
}
