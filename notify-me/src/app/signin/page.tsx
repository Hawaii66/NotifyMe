"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;

  return (
    <Link href={url}>
      <Button>Sign in with Github</Button>
    </Link>
  );
}

export default page;
