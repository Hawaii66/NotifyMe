import { UserHasProjectAccess } from "@/lib/server/project";
import { Children } from "@/types/Utils";
import React from "react";

async function Layout({
  params,
  children,
}: Children & { params: { id: string } }) {
  const hasAccess = await UserHasProjectAccess(parseInt(params.id));

  if (!hasAccess) return <p>Access not allowed</p>;

  return <>{children}</>;
}

export default Layout;
