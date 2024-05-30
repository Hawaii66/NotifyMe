import { Service } from "@/types/Service";
import { Pencil, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  service: Service;
};

function ServicePreview({ service }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-2 grid grid-cols-2">
          <p>Pending notifications:</p>
          <p>{service.pendingNotifications}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end items-center gap-4">
        <Link
          href={`/dashboard/projects/${service.projectId}/services/${service.id}`}
        >
          <Button className="flex flex-row gap-2">
            <SquareArrowOutUpRight size={20} /> Visit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ServicePreview;
