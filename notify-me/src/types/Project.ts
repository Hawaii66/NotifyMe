import { Service } from "./Service";
import { PublicUser } from "./User";

export type Project = {
  name: string;
  description: string;
  users: PublicUser[];
  services: Service[];
  id: number;
  color: string;
};
