"use server";

import { Project } from "@/types/Project";
import { FilterUndefined } from "../utils";
import { createClient } from "../supabase";
import { GetProjectServices } from "./service";
import { GetProjectUsers } from "./user";
import { GetSessionRedirect } from "./auth";

export async function RemoveUser(projectId: number, userId: number) {
  const supabase = createClient();

  await supabase
    .from("notifyme_project_users")
    .delete()
    .eq("project", projectId)
    .eq("user", userId);
}

export async function CreateProject(newProject: {
  name: string;
  description: string;
  color: string;
}): Promise<number> {
  const supabase = createClient();
  const idData = await supabase
    .from("notifyme_project")
    .insert({
      ...newProject,
    })
    .select("id");

  if (!idData.data) return -1;

  return idData.data[0].id;
}

export async function AddUserEmail(projectId: number, email: string) {
  const supabase = createClient();

  const idData = await supabase
    .from("notifyme_users")
    .select("id")
    .eq("email", email)
    .single();
  if (!idData.data) return "User does not exist";

  await AddUser(projectId, idData.data.id);
}

export async function AddUser(projectId: number, userId: number) {
  const supabase = createClient();

  const exist = await supabase
    .from("notifyme_project_users")
    .select("id")
    .eq("project", projectId)
    .eq("user", userId)
    .single();
  if (exist.data) return;

  await supabase.from("notifyme_project_users").insert({
    project: projectId,
    user: userId,
  });
}

export async function UserHasProjectAccess(id: number) {
  const userId = await GetSessionRedirect();

  const supabase = createClient();

  const users = await supabase
    .from("notifyme_project_users")
    .select("user")
    .eq("project", id);

  const filterd = users.data?.map((i) => i.user) ?? [];

  return filterd.includes(userId);
}

export async function GetProject(id: number): Promise<Project | undefined> {
  const supabase = createClient();

  const projectData = await supabase
    .from("notifyme_project")
    .select("*")
    .eq("id", id)
    .single();

  if (!projectData.data) return undefined;

  const services = await GetProjectServices(id);
  const users = await GetProjectUsers(id);

  const project: Project = {
    color: projectData.data.color,
    description: projectData.data.description,
    id: projectData.data.id,
    name: projectData.data.name,
    services: services,
    users: users,
  };

  return project;
}

export async function GetProjects(userId: number): Promise<Project[]> {
  const supabase = createClient();
  const ids = await supabase
    .from("notifyme_project_users")
    .select("project")
    .eq("user", userId);
  if (!ids.data) return [];

  const projectPromises = ids.data.map((id) => GetProject(id.project));

  const projects = await Promise.all(projectPromises);

  return projects.filter(FilterUndefined);
}
