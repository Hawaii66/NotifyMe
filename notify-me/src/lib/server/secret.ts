"use server";

import { createClient } from "../supabase";
import * as crypto from "crypto";

export async function AddSecret(name: string, serviceId: number) {
  const supabase = createClient();

  const secret = crypto.randomBytes(8).toString("hex");

  const hashedSecret = await HashSecret(secret);

  await supabase.from("notifyme_service_secrets").insert({
    name: name,
    secret: hashedSecret,
    service: serviceId,
  });

  return secret;
}

export async function HashSecret(secret: string) {
  const hash = crypto.createHash("sha256");
  hash.update(secret);

  const hashedSecret = hash.digest("hex");

  return hashedSecret;
}

export async function RemoveSecret(name: string, serviceId: number) {
  const supabase = createClient();

  await supabase
    .from("notifyme_service_secrets")
    .delete()
    .eq("name", name)
    .eq("service", serviceId);
}

export async function TestSecret(serviceId: number, secret: string) {
  const supabase = createClient();

  const hashedSecret = await HashSecret(secret);
  const nameData = await supabase
    .from("notifyme_service_secrets")
    .select("name")
    .eq("service", serviceId)
    .eq("secret", hashedSecret)
    .single();

  if (!nameData.data) return false;

  return nameData.data.name;
}

export async function VerifySecret(serviceId: number, secret: string) {
  const supabase = createClient();

  const hashedSecret = await HashSecret(secret);
  const nameData = await supabase
    .from("notifyme_service_secrets")
    .select("id")
    .eq("service", serviceId)
    .eq("secret", hashedSecret)
    .single();

  if (!nameData.data) return false;

  return true;
}
