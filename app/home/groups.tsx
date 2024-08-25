"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Group from "../components/group";
import { useEffect, useState } from "react";
import { GroupItem } from "../types";

export default function Groups() {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/api/member/get/groups`)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
        })
        .catch((err) => console.log("error: ", err));
    }
  }, [user]);

  return (
    <div className="space-y-10">
      {groups.map((group: GroupItem) => (
        <Group key={group.id} name={group.name} members={group.members} />
      ))}
    </div>
  );
}
