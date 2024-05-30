import CreateProject from "@/components/CreateProject";
import ProjectPreview from "@/components/ProjectPreview";
import { GetSessionRedirect } from "@/lib/server/auth";
import { GetProjects } from "@/lib/server/project";

export const revalidate = 0;

async function Page() {
  const userId = await GetSessionRedirect();
  const projects = await GetProjects(userId);

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg">Projects</h2>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-600 opacity-20 rounded-full w-1" />
        <div className="flex flex-row flex-wrap gap-4 p-4">
          {projects.map((project: any) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
          <CreateProject />
        </div>
      </div>
    </div>
  );
}

export default Page;
