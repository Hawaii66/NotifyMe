import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUser, LogOut } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const user = await GetUser();

  if (!user) redirect("/signin");

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg">User</h2>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-600 opacity-20 rounded-full w-1" />
        <div className="flex flex-row flex-wrap gap-4 p-4">
          <Label>Id</Label>
          <Input disabled value={user.id} />
          <Label>Email</Label>
          <Input disabled value={user.email} />
          <Label>Name</Label>
          <Input disabled value={user.name} />
          <form
            action={async () => {
              "use server";
              LogOut();
              redirect("/");
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
