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
import { TestSecret } from "@/lib/server/secret";

type Props = {
  serviceId: number;
};
function VerifySecret({ serviceId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [name, setName] = useState<string>();

  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(newState) => {
        if (loading) return;
        setOpen(newState);
        setSecret("");
        setName(undefined);
      }}
      open={open}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button variant={"secondary"}>Test Secret</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Secret</DialogTitle>
        </DialogHeader>
        <div className="gap-2 grid grid-cols-2">
          <Label>Secret</Label>
          <Input
            value={secret}
            onChange={(e) => setSecret((o) => e.target.value)}
          />
          <div />
          <Button
            onClick={async () => {
              setLoading(true);

              const name = await TestSecret(serviceId, secret);

              if (name === false) {
                alert("Secret does not match any in this service");
              } else {
                setName(name);
              }
              setSecret(secret);

              setLoading(false);
              router.refresh();
            }}
            disabled={loading || secret.length < 3}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Test Secret"
            )}
          </Button>
          <ul className="col-span-2">
            <li>- 🧪 Test your secret </li>
            <li>- 🛡️ Hashed and tested on server </li>
            <li>- 🏷️ If matched, name of secret is displayed below</li>
          </ul>
          <Separator className="col-span-2" />
          <p>Paste this into your project</p>
          {secret === undefined ? (
            <Button variant={"outline"} disabled>
              Test secret above
            </Button>
          ) : (
            <Button variant={"outline"} disabled>
              {name}
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

export default VerifySecret;
