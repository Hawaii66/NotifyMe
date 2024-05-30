"use server";

import { createClient } from "../supabase";
import { Notify } from "../../types/Notification";

export async function GetNotifications(serviceId: number): Promise<Notify[]> {
  const supabase = createClient();

  const notificationData = await supabase
    .from("notifyme_notifications")
    .select("*")
    .eq("service", serviceId);

  return (
    notificationData.data?.map((i) => ({
      completed: i.completed,
      data: i.data,
      description: i.description,
      id: i.id,
      serviceId: serviceId,
      time: new Date(i.created_at),
      title: i.title,
      level: i.level as any,
    })) ?? []
  );
}

export async function MarkCompleted(
  notificationId: number,
  completed: boolean
) {
  const supabase = createClient();

  await supabase
    .from("notifyme_notifications")
    .update({
      completed: completed,
    })
    .eq("id", notificationId);
}
