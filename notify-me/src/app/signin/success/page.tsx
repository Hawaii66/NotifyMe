"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      setError("Tokens not found in redirect, try again");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    router.replace("/dashboard");
  }, [searchParams]);

  return (
    <div>
      <p className="py-24 font-semibold text-center text-lg text-red">
        {error}
      </p>
    </div>
  );
}

export default page;
