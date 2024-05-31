"use server";

import { Service } from "@/types/Service";
import { createClient } from "../supabase";
import { GetSessionRedirect } from "./auth";
import { GetRandomId } from "./id";

export async function UserHasServiceAccess(serviceId: number | undefined) {
  if (!serviceId) return false;

  const user = await GetSessionRedirect();

  const supabase = createClient();

  const users = await supabase
    .from("notifyme_services")
    .select(
      `notifyme_project (
			notifyme_project_users(
				user
			)
		)
	  `
    )
    .eq("id", serviceId)
    .single();

  const usersFiltered =
    users.data?.notifyme_project?.notifyme_project_users.map((i) => i.user);

  if (usersFiltered?.includes(user)) {
    return true;
  }

  return false;
}

export async function CreateService(service: {
  name: string;
  description: string;
  color: string;
  projectId: number;
}): Promise<number> {
  const supabase = createClient();

  const serviceIdData = await supabase
    .from("notifyme_services")
    .insert({
      color: service.color,
      description: service.description,
      name: service.name,
      project: service.projectId,
      id: await GetRandomId(supabase, "notifyme_services"),
    })
    .select("id");

  if (!serviceIdData.data) return -1;

  return serviceIdData.data[0].id;
}

export async function GetService(
  serviceId: number
): Promise<Service | undefined> {
  const supabase = createClient();

  const servicesData = await supabase
    .from("notifyme_services")
    .select("*")
    .eq("id", serviceId)
    .single();

  if (!servicesData.data) return undefined;

  const secretNamesData = await supabase
    .from("notifyme_service_secrets")
    .select("name")
    .eq("service", serviceId);

  const notificationCount = await supabase
    .from("notifyme_notifications")
    .select("id")
    .eq("completed", false)
    .eq("service", serviceId);

  if (!secretNamesData.data) return undefined;

  return {
    color: servicesData.data.color,
    description: servicesData.data.description,
    id: serviceId,
    name: servicesData.data.name,
    pendingNotifications: notificationCount.data?.length ?? 0,
    projectId: servicesData.data.project,
    secretNames: secretNamesData.data.map((i) => i.name),
  };
}

export async function GetProjectServices(
  projectId: number
): Promise<Service[]> {
  const supabase = createClient();

  const servicesData = await supabase
    .from("notifyme_services")
    .select("*")
    .eq("project", projectId);

  if (!servicesData.data) return [];

  const secretNamesData = await supabase
    .from("notifyme_service_secrets")
    .select("service,name")
    .in(
      "service",
      servicesData.data.map((i) => i.id)
    );

  const notificationsPending = await supabase
    .from("notifyme_notifications")
    .select("service")
    .eq("completed", false)
    .in(
      "service",
      servicesData.data.map((i) => i.id)
    );

  if (!secretNamesData.data) return [];

  return servicesData.data?.map((service) => ({
    color: service.color,
    description: service.description,
    id: service.id,
    name: service.name,
    pendingNotifications:
      notificationsPending.data?.filter((i) => i.service === service.id)
        .length ?? 0,
    projectId: projectId,
    secretNames: secretNamesData.data
      .filter((i) => i.service === service.id)
      .map((i) => i.name),
  }));
}
