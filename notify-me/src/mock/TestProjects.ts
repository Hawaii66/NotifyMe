import { Project } from "@/types/Project";
import { PublicUser } from "@/types/User";

export const HawaiiDev: PublicUser = {
  email: "test@outlook.com",
  icon: "https://avatars.githubusercontent.com/u/67507774?s=400&u=f312e4f28271aaa13097fdd9b3d0ba4679faa596&v=4",
  name: "HawaiiDev",
};

export const TodoApp: Project = {
  name: "TODO App",
  description: "Create todos and complete them when completed",
  color: "#F8D082",
  id: "123",
  services: [
    {
      color: "#00215E",
      description: "Logs events happening on the backend",
      id: "321",
      name: "Server",
      projectId: "123",
      pendingNotifications: 12,
    },
    {
      color: "#A3D8FF",
      description: "Logs events on the website",
      id: "213",
      name: "Website",
      projectId: "123",
      pendingNotifications: 93,
    },
  ],
  users: [HawaiiDev],
};

export const NotifyApp: Project = {
  name: "NotifyMe",
  color: "#7ABA78",
  description: "Notify users about things happening in their app",
  id: "312",
  services: [
    {
      color: "#4F6F52",
      description: "NextJS application",
      id: "3123123",
      name: "NextJS",
      projectId: "312",
      pendingNotifications: 2,
    },
  ],
  users: [
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
    HawaiiDev,
  ],
};

export const Projects = [TodoApp, NotifyApp];
