"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AddUserEmail } from "@/lib/server/project";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

type Props = {
  projectId: number;
};

function AddUserToProject({ projectId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");

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
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>Add a user with their email</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            placeholder="user@provider.com"
          />
        </div>
        <DialogFooter>
          <DialogClose />
          <Button
            onClick={async () => {
              setLoading(true);
              await AddUserEmail(projectId, newUserEmail);

              setLoading(false);
              setOpen(false);
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

export default AddUserToProject;
