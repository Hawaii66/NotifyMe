import { Project } from "@/types/Project";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Pencil, SquareArrowOutUpRight } from "lucide-react";

type Props = {
  project: Project;
};

function ProjectPreview({ project }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-2">
        <div
          className="rounded-full w-2"
          style={{ backgroundColor: project.color }}
        ></div>
        <div className="gap-2 grid grid-cols-2">
          <p>Users:</p>
          <p>{project.users.length}</p>
          <p>Services:</p>
          <p>{project.services.length}</p>
          <p>Pending notifications:</p>
          <p>
            {project.services.reduce(
              (prev, curr) => (prev += curr.pendingNotifications),
              0
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end items-center gap-4">
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button className="flex flex-row gap-2">
            <SquareArrowOutUpRight size={20} /> Visit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectPreview;
