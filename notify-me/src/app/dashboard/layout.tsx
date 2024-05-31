import Avatar from "@/components/Avatar";
import { UserIdWrapper } from "@/components/UserIdWrapper";
import { Button } from "@/components/ui/button";
import { GetUser } from "@/lib/server/auth";
import { Children } from "@/types/Utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function Layout({ children }: Children) {
  const user = await GetUser();

  if (!user) redirect("/signin");

  return (
    <UserIdWrapper userId={user.id}>
      <div className="min-h-screen">
        <nav className="flex flex-row justify-between items-center p-4 border-b">
          <Link href={"/"}>
            <h1 className="font-bold text-2xl text-orange-500">Direct Alert</h1>
          </Link>
          <div className="flex flex-row gap-4">
            <Link href={"/dashboard"}>
              <Button variant={"link"}>Dashboard</Button>
            </Link>
            <Link
              href={"/dashboard/me"}
              className="flex justify-center items-center"
            >
              <Avatar user={user} />
            </Link>
          </div>
        </nav>
        <div>{children}</div>
      </div>
    </UserIdWrapper>
  );
}

export default Layout;
