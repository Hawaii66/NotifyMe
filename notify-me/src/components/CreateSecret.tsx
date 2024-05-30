"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { Copy, LoaderCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import { AddSecret } from "@/lib/server/secret";

type Props = {
  serviceId: number;
};

function CreateSecret({ serviceId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [secret, setSecret] = useState<string>();

  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(newState) => {
        if (loading) return;
        setOpen(newState);
        setSecret(undefined);
        setName("");
      }}
      open={open}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button>Add Secret</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Secret</DialogTitle>
        </DialogHeader>
        <div className="gap-2 grid grid-cols-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <div />
          <Button
            onClick={async () => {
              setLoading(true);

              const secret = await AddSecret(name, serviceId);
              setSecret(secret);

              setLoading(false);
              router.refresh();
            }}
            disabled={loading || name.length < 3}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Generate Secret"
            )}
          </Button>
          <ul className="col-span-2">
            <li>- 🏷️ Name your secret above </li>
            <li>- 🛡️ The secret is generated and hashed on the server </li>
            <li>
              - 🔑 Copy the appearing secret and paste it into your project.{" "}
            </li>
          </ul>
          <Separator className="col-span-2" />
          <p>Paste this into your project</p>
          {secret === undefined ? (
            <Button variant={"outline"} disabled>
              Generate secret above
            </Button>
          ) : (
            <Button
              onClick={() => {
                alert(secret);
                navigator.clipboard.writeText(secret);
              }}
              variant={"outline"}
              className="flex flex-row justify-between items-center"
            >
              <p className="flex-grow text-center">{secret}</p>
              <Copy />
            </Button>
          )}
        </div>
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSecret;
