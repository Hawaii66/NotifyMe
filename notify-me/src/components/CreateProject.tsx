"use client";

import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AddUser, CreateProject } from "@/lib/server/project";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserIdContext } from "./UserIdWrapper";

function CreateProjectButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    color: "#0000000",
  });

  const userId = useContext(UserIdContext);

  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(newState) => {
        if (loading) return;
        setOpen(newState);
      }}
      open={open}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <div className="flex flexj flex-grow justify-center items-center col-span-1 row-span-1">
          <Button>Add Project</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
        </DialogHeader>
        <div className="gap-2 grid grid-cols-2">
          <Label>Name</Label>
          <Input
            value={newProject.name}
            onChange={(e) =>
              setNewProject((o) => ({ ...o, name: e.target.value }))
            }
            disabled={loading}
          />
          <Label>Description</Label>
          <Input
            value={newProject.description}
            onChange={(e) =>
              setNewProject((o) => ({
                ...o,
                description: e.target.value,
              }))
            }
            disabled={loading}
          />
          <Label>Color</Label>
          <Input
            type="color"
            value={newProject.color}
            onChange={(e) =>
              setNewProject((o) => ({
                ...o,
                color: e.target.value,
              }))
            }
            disabled={loading}
          />
        </div>
        <DialogFooter>
          <DialogClose />
          <Button
            onClick={async () => {
              setLoading(true);
              const projectId = await CreateProject(newProject);
              await AddUser(projectId, userId);

              setOpen(false);
              setLoading(false);
              router.refresh();
            }}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectButton;
