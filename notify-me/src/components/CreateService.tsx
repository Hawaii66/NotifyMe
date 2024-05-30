"use client";

import React, { useState } from "react";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CreateService } from "@/lib/server/service";
import { LoaderCircle } from "lucide-react";

type Props = {
  projectId: number;
};

function CreateServiceDialog({ projectId }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000000");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(newState) => {
        if (loading) return;
        setOpen(newState);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button>Add Service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Service</DialogHeader>
        <DialogDescription>
          Add a service to this project which can report notifications
        </DialogDescription>
        <div className="gap-2 grid grid-cols-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Label>Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Label>Color</Label>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose />
          <Button
            onClick={async () => {
              setLoading(true);

              await CreateService({
                color,
                description,
                name,
                projectId: projectId,
              });

              setLoading(false);
              setOpen(false);
              router.refresh();
            }}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add service"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateServiceDialog;
