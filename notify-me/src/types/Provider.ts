import { NotificationLevel } from "./Notification";

export type Provider = {
  url: string;
  provider: string;
  levels: NotificationLevel[];
  serviceId: number;
  id: number;
};
