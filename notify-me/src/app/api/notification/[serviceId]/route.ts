import { HashSecret, VerifySecret } from "@/lib/server/secret";
import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const Levels = ["info", "warning", "error", "none"] as const;

const responseDataSchema = z
  .object({
    data: z.any().optional(),
    title: z
      .string({ message: "title must be a string" })
      .min(5, { message: "title must be longer than 4 characters" })
      .nullable()
      .optional(),
    description: z
      .string({ message: "description must be a string" })
      .nullable()
      .optional(),
    level: z.enum(Levels).nullable().optional(),
  })
  .strict();

export const POST = async (
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) => {
  const serviceId = parseInt(params.serviceId);
  if (isNaN(serviceId))
    return NextResponse.json(
      { message: "Service id must be a number" },
      { status: 404 }
    );

  const searchParams = new URL(request.url).searchParams;

  const secret = searchParams.get("secret");

  if (!secret)
    return NextResponse.json(
      { message: "Missing param: secret" },
      { status: 400 }
    );

  var info: {
    data: any | null;
    title: string | null;
    description: string | null;
    level: (typeof Levels)[number] | null;
  } = {
    data: null,
    description: null,
    title: null,
    level: null,
  };

  try {
    const data = await request.json();
    const parsedData = responseDataSchema.parse(data);

    info.data = parsedData.data ?? null;
    info.title = parsedData.title ?? null;
    info.description = parsedData.description ?? null;
    info.level = parsedData.level ?? null;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        {
          zod: e.issues.map((i) => ({
            message: i.message,
            code: i.code,
          })),
          message: "Zod validation of notification info failed",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to parse body" },
      { status: 400 }
    );
  }
  const isCorrectSecret = await VerifySecret(serviceId, secret);
  if (!isCorrectSecret)
    return NextResponse.json(
      {
        message:
          "The provided secret does not match the requested services available secrets",
      },
      { status: 400 }
    );

  const supabase = createClient();

  const hashedSecret = await HashSecret(secret);

  const insertedNotificationData = await supabase
    .from("notifyme_notifications")
    .insert({
      completed: false,
      service: serviceId,
      service_secret_creator: hashedSecret,
      data: info.data,
      description: info.description,
      title: info.title,
      level: info.level ?? "none",
    })
    .select("*")
    .single();

  if (!insertedNotificationData.data)
    return NextResponse.json(
      {
        message: "Could not create notification in database",
        error: insertedNotificationData.error.message,
      },
      { status: 500 }
    );

  await supabase.from("notifyme_pending_notifications").insert({
    notfication: insertedNotificationData.data.id,
  });

  const insertedInfo = {
    id: insertedNotificationData.data.id,
    completed: insertedNotificationData.data.completed,
    title: insertedNotificationData.data.title,
    description: insertedNotificationData.data.description,
    level: insertedNotificationData.data.level,
    service: insertedNotificationData.data.service,
    data: insertedNotificationData.data.data,
  };

  return NextResponse.json({
    message: "The notification was inserted successfully",
    notification: insertedInfo,
  });
};
