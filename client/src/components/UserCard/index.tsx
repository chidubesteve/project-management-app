import { User } from "@/state/services/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex mb-3 items-center rounded p-4 shadow dark:bg-dark-secondary dark:text-white">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>
          {" "}
          <strong>Username: </strong>
          {user.username}
        </h3>
        <p>
          {" "}
          <strong>Email: </strong>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
