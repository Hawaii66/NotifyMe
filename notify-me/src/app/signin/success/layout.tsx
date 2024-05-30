import { Children } from "@/types/Utils";
import React, { Suspense } from "react";

function Layout({ children }: Children) {
  return <Suspense>{children}</Suspense>;
}

export default Layout;
