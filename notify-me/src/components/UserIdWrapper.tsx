"use client";

import { Children } from "@/types/Utils";
import { createContext } from "react";

export const UserIdContext = createContext(0);

export function UserIdWrapper({
  children,
  userId,
}: Children & { userId: number }) {
  return (
    <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
  );
}
