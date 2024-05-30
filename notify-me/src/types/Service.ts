import { Project } from "./Project";

export type Service = {
  name: string;
  description: string;
  id: number;
  color: string;
  projectId: Project["id"];
  pendingNotifications: number;
  secretNames: string[];
};
