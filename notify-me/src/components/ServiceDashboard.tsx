import { Service } from "@/types/Service";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { revalidatePath } from "next/cache";
import CreateSecret from "./CreateSecret";
import { Trash } from "lucide-react";
import { RemoveSecret } from "@/lib/server/secret";
import VerifySecret from "./VerifySecret";
import { Separator } from "./ui/separator";
import { Notify } from "@/types/Notification";
import NotificationTable from "./NotificationTable";
import ProviderConnector from "./ProviderConnector";
import { Provider } from "@/types/Provider";
import Providers from "./Providers";

type Props = {
  service: Service;
  notifications: Notify[];
  providers: Provider[];
};

function ServiceDashboard({ service, notifications, providers }: Props) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-full w-full h-2"
            style={{ backgroundColor: service.color }}
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="font-semibold text-lg">Secrets</h3>
              <div className="flex flex-col flex-wrap gap-2">
                {service.secretNames.map((secret) => (
                  <AlertDialog key={secret}>
                    <AlertDialogTrigger className="flex flex-row justify-center items-center gap-4 border-2 border-white hover:border-neutral-100 p-2 rounded-lg">
                      <p className="flex-grow text-left">{secret}</p> <Trash />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete secret</AlertDialogTitle>
                        <AlertDialogDescription>
                          Any service using this secret will not work anymore
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form
                          action={async () => {
                            "use server";
                            RemoveSecret(secret, service.id);
                            revalidatePath("/");
                          }}
                        >
                          <AlertDialogAction type="submit">
                            Remove
                          </AlertDialogAction>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))}
                {service.secretNames.length === 0 && (
                  <p>No secret available, generate a secret below</p>
                )}
              </div>
              <CreateSecret serviceId={service.id} />
              <VerifySecret serviceId={service.id} />
            </div>
            <Separator className="my-2" />
            <Providers providers={providers} />
            <ProviderConnector serviceId={service.id} />
            <Separator className="my-2" />
            <NotificationTable notifications={notifications} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceDashboard;
