import ProjectDashboard from "@/components/ProjectDashboard";
import { Button } from "@/components/ui/button";
import { GetProject } from "@/lib/server/project";
import Link from "next/link";
import React from "react";

export const revalidate = 0;

async function Page({ params }: { params: { id: string } }) {
  const project = await GetProject(parseInt(params.id));

  if (!project)
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <p className="font-semibold text-2xl text-center text-slate-600">
          Project not found
        </p>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
      </div>
    );
  return <ProjectDashboard project={project} />;
}

export default Page;
