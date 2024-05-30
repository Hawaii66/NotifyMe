import ServiceDashboard from "@/components/ServiceDashboard";
import { GetNotifications } from "@/lib/server/notification";
import { GetProviders } from "@/lib/server/provider";
import { GetService, UserHasServiceAccess } from "@/lib/server/service";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate = 0;

async function Page({ params }: { params: { id: string; serviceId: string } }) {
  const serviceId = parseInt(params.serviceId);
  const hasAccess = await UserHasServiceAccess(serviceId);
  if (!hasAccess) return <p>Access Not allowed</p>;

  const service = await GetService(serviceId);
  const notifications = await GetNotifications(serviceId);
  const providers = await GetProviders(serviceId);

  if (!service) {
    redirect("/dashboard");
  }

  return (
    <ServiceDashboard
      providers={providers}
      service={service}
      notifications={notifications}
    />
  );
}

export default Page;
