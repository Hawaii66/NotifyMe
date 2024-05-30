"use client";

import { Check, CircleX, Info, TriangleAlert } from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { NotificationLevel, Notify } from "@/types/Notification";
import { Label } from "./ui/label";
import { Toggle } from "./ui/toggle";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MarkCompleted } from "@/lib/server/notification";
import { useRouter } from "next/navigation";

type Props = {
  notifications: Notify[];
};

function NotificationTable({ notifications: serverNotifications }: Props) {
  const [notifications, setNotifications] = useState(serverNotifications);

  const [showNotCompletedOnly, setShowOnlyNotCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("-");

  const router = useRouter();

  const filter = (notification: Notify) => {
    if (showNotCompletedOnly && notification.completed) return false;

    if (level !== "-" && notification.level !== level) return false;

    if (search === "") return true;

    return (
      notification.title?.toLowerCase().includes(search.toLowerCase()) ||
      notification.description?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <h3 className="font-semibold text-lg">Notifications</h3>
      <div className="gap-4 grid grid-cols-2">
        <Label>Only show not completed</Label>
        <Switch
          checked={showNotCompletedOnly}
          onCheckedChange={setShowOnlyNotCompleted}
        />
        <Label>Search</Label>
        <Input
          placeholder="search . . ."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Label>Show level</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-">All</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="justify-between items-center gap-x-4 grid grid-cols-7 rounded-lg overflow-hidden">
        <div
          className={`gap-x-4 gap-y-2 grid grid-cols-7 col-span-7 py-2 items-center justify-center px-2 bg-neutral-100`}
        >
          <p className="font-bold">Id</p>
          <p className="font-bold">Created at</p>
          <p className="font-bold">Level</p>
          <p className="font-bold">Title</p>
          <p className="font-bold">Description</p>
          <p className="font-bold">Extra Data</p>
          <p className="font-bold">Completed</p>
        </div>
        <div className="col-span-7 bg-black w-full h-[1px]" />
        {notifications
          .filter(filter)
          .sort((a, b) => a.time.getTime() - b.time.getTime())
          .map((notify, idx) => (
            <div
              className={`gap-x-4 gap-y-2 grid grid-cols-7 col-span-7 py-2 items-center justify-center px-2 ${
                idx % 2 === 0 ? "bg-neutral-200" : "bg-neutral-100"
              } `}
              key={notify.id}
            >
              <div>{notify.id}</div>
              <div>{notify.time.toISOString()}</div>
              <div>
                {notify.level === "none" ? (
                  ""
                ) : notify.level === "warning" ? (
                  <TriangleAlert color="orange" />
                ) : notify.level === "error" ? (
                  <CircleX color="red" />
                ) : (
                  <Info color="blue" />
                )}
              </div>
              <div>{notify.title}</div>
              <div>{notify.description?.slice(0, 50)}</div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"outline"}>Data</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      Title: {notify.title === null ? "no title" : notify.title}
                    </SheetTitle>
                    <SheetDescription>
                      Description:{" "}
                      {notify.description === null
                        ? "no description"
                        : notify.description}
                    </SheetDescription>
                  </SheetHeader>
                  <div>
                    Data: {notify.data === null ? "no data" : notify.data}
                  </div>
                  <SheetFooter>
                    <SheetClose />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Button
                onClick={async () => {
                  setNotifications((t) => {
                    return t.map((i) => {
                      if (i.id !== notify.id) return i;

                      return { ...i, completed: !i.completed };
                    });
                  });

                  await MarkCompleted(notify.id, !notify.completed);
                  router.refresh();
                }}
                className="aspect-square"
                variant={"outline"}
              >
                {notify.completed ? <Check /> : <></>}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NotificationTable;
