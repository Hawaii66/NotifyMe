import { Provider } from "@/types/Provider";
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
import { Button } from "./ui/button";
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
import { TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { DeleteProvider } from "@/lib/server/provider";
import { useRouter } from "next/navigation";
import { NotificationLevel } from "@/types/Notification";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  provider: Provider;
  idx: number;
};

function ProviderRow({ provider, idx }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState<NotificationLevel>(provider.levels[0]);
  const [secret, setSecret] = useState("");

  const router = useRouter();

  const deleteProvider = async (id: number) => {
    await DeleteProvider(id);
    router.refresh();
  };

  const testNotification = async () => {
    const response = await fetch(
      `/api/notification/${provider.serviceId}?secret=${secret}`,
      {
        method: "POST",
        body: JSON.stringify({ title, level }),
      }
    );

    if (response.status !== 200) {
      const data: { message: string } = await response.json();
      alert(
        `Notification failed with status code: ${response.status} and message: ${data.message}`
      );
    } else {
      alert("Notification was successfull, check your provider :D");
    }
  };

  return (
    <div
      className={`gap-x-4 gap-y-2 grid grid-cols-7 col-span-7 py-2 items-center justify-center px-2 ${
        idx % 2 === 0 ? "bg-neutral-200" : "bg-neutral-100"
      } `}
      key={provider.id}
    >
      <div>{provider.id}</div>
      <div>{provider.provider}</div>
      <ul>
        {provider.levels.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"}>{new URL(provider.url).host}</Button>
            </TooltipTrigger>
            <TooltipContent>{provider.url}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button onClick={async () => {}} variant={"outline"}>
              <TrashIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete provider</AlertDialogTitle>
              <AlertDialogDescription>
                Deleteing this provider will result in no more notifications
                being sent here
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteProvider(provider.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Test notification</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test notification</DialogTitle>
              <DialogDescription>
                Test sending a notification to this provider
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <Label>Level</Label>
              <Select
                value={level}
                onValueChange={(s) => setLevel(s as NotificationLevel)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Label>Secret</Label>
              <Input
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose />
              <Button
                type="submit"
                onClick={() => {
                  setOpen(false);
                  testNotification();
                }}
              >
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ProviderRow;
