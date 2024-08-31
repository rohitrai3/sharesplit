"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Group from "../components/group";
import { useEffect, useState } from "react";
import { GroupItem } from "../types";
import Link from "next/link";

export default function Groups() {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/member/get/groups`)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
        })
        .catch((err) => console.log("error: ", err));
    }
  }, [user]);

  return (
    <div className="space-y-5">
      {groups.map((group: GroupItem) => (
        <div key={group.id}>
          <Link href={`/group/view/${group.id}`}>
            <Group name={group.name} members={group.members} />
          </Link>
        </div>
      ))}
    </div>
  );
}
