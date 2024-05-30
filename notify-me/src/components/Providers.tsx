"use client";

import { Provider } from "@/types/Provider";
import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TrashIcon } from "lucide-react";
import { Alert } from "./ui/alert";
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
import { DeleteProvider } from "@/lib/server/provider";
import { useRouter } from "next/navigation";
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
import ProviderRow from "./ProviderRow";

type Props = {
  providers: Provider[];
};

function Providers({ providers }: Props) {
  return (
    <div className="justify-between items-center gap-x-4 grid grid-cols-7 rounded-lg overflow-hidden">
      <div
        className={`gap-x-4 gap-y-2 grid grid-cols-7 col-span-7 py-2 items-center justify-center px-2 bg-neutral-100`}
      >
        <p className="font-bold">Id</p>
        <p className="font-bold">Provider</p>
        <p className="font-bold">Levels</p>
        <p className="font-bold">URL</p>
        <p className="font-bold">Actions</p>
      </div>
      <div className="col-span-7 bg-black w-full h-[1px]" />
      {providers.map((provider, idx) => (
        <ProviderRow key={provider.id} idx={idx} provider={provider} />
      ))}
    </div>
  );
}

export default Providers;
