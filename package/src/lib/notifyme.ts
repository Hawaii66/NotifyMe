import { z } from "zod";

type Log<T> = {
  title?: string | null;
  description?: string | null;
  data?: T;
};

var API_ROUTE = "test";

var SERVICE_ID = -1;
var SECRET = "";
var metadata: any;

const ProcessParser = z
  .object({
    serviceId: z.number(),
    secret: z.string({ message: "Secret must be a string" }),
  })
  .strip();

type Level = "info" | "error" | "warning";

function Init(serviceId: number, serviceSecret: string) {
  const parsed = ProcessParser.parse({
    serviceId,
    secret: serviceSecret,
  });
  SERVICE_ID = parsed.serviceId;
  SECRET = parsed.secret;
}

function SetLogMetadata<T>(data: T) {
  metadata = data;
}

function InitFromEnv() {
  try {
    const args = ProcessParser.parse({
      serviceId: parseInt(process.env.NOTIFY_ME_SERVICE_ID ?? ""),
      secret: process.env.NOTIFY_ME_SECRET,
    });
    SERVICE_ID = args.serviceId;
    SECRET = args.secret;
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(e.message);
    }
  }
}

async function Log<T>(info: Log<T> & { level?: Level }) {
  if (SERVICE_ID === -1 || SECRET === "") {
    InitFromEnv();
  }

  const response = await fetch(
    `${API_ROUTE}/notification/${SERVICE_ID}?secret=${SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({ ...info, data: { ...info.data, ...metadata } }),
    }
  );

  if (!response.ok) {
    var message = "No message from server";
    try {
      message = await response.json();
    } catch (_) {}
    return {
      type: "error",
      message: `The response failed with status code: ${response.status}`,
      status: response.status,
      messageFromServer: message,
    };
  }

  const body: { notification: { id: number } } = await response.json();

  return {
    type: "success",
    message: `The response was successfull with id: ${body.notification.id}`,
    id: body.notification.id,
  };
}

async function LogInfo<T>(info: Log<T>) {
  return Log({ ...info, level: "info" });
}

async function LogError<T>(info: Log<T>) {
  return Log({ ...info, level: "error" });
}

async function LogWarning<T>(info: Log<T>) {
  return Log({ ...info, level: "warning" });
}

export const Notify = {
  Log,
  Warning: LogWarning,
  Error: LogError,
  Info: LogInfo,
  Init,
  SetLogMetadata,
};
