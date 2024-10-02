"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Group from "../components/group";
import { useEffect, useState } from "react";
import { GroupItem } from "../types";
import Link from "next/link";
import Loading from "../components/loading";

export default function Groups() {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetch(`/api/member/get/groups`)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("error: ", err);
          setIsLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="space-y-5">
      {isLoading ? (
        <Loading />
      ) : (
        groups.map((group: GroupItem) => (
          <div key={group.id}>
            <Link href={`/group/view/${group.id}`}>
              <Group name={group.name} members={group.members} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
