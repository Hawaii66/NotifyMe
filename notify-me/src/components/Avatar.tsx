import { PublicUser } from "@/types/User";
import React from "react";

type Props = {
  user: PublicUser;
};

function Avatar({ user }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <img src={user.icon} className="rounded-full w-6 h-6" />
      <p>{user.name}</p>
    </div>
  );
}

export default Avatar;
