export type Notify = {
  serviceId: number;
  id: number;
  data: any;
  title: string | null;
  description: string | null;
  time: Date;
  completed: boolean;
  level: NotificationLevel;
};

export type NotificationLevel = "info" | "warning" | "error" | "none";
