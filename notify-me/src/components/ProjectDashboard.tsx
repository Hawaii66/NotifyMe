import { Project } from "@/types/Project";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Avatar from "./Avatar";
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
import ServicePreview from "./ServicePreview";
import { RemoveUser } from "@/lib/server/project";
import AddUserToProject from "./AddUserToProject";
import { revalidatePath } from "next/cache";
import CreateService from "./CreateService";
import { GetSessionRedirect } from "@/lib/server/auth";

type Props = {
  project: Project;
};

async function ProjectDashboard({ project }: Props) {
  const userId = await GetSessionRedirect();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-full w-full h-2"
            style={{ backgroundColor: project.color }}
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="font-semibold text-lg">Users</h3>
              <div className="flex flex-row flex-wrap gap-2">
                {project.users.map((user) => (
                  <AlertDialog key={user.id}>
                    <AlertDialogTrigger className="border-2 border-white hover:border-neutral-100 p-2 rounded-lg">
                      <Avatar user={user} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{user.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {user.email}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form
                          action={async () => {
                            "use server";
                            await RemoveUser(project.id, user.id);
                            revalidatePath("/");
                          }}
                        >
                          <AlertDialogAction
                            disabled={userId === user.id}
                            type="submit"
                          >
                            {userId === user.id
                              ? "Can not remove yourself"
                              : "Remove"}
                          </AlertDialogAction>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))}
              </div>
              <AddUserToProject projectId={project.id} />
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="font-semibold text-lg">Services</h3>
              <div className="flex flex-row flex-wrap gap-2">
                {project.services.map((service) => (
                  <ServicePreview key={service.id} service={service} />
                ))}
              </div>
              <CreateService projectId={project.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectDashboard;
