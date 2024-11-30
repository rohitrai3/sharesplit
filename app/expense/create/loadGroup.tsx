import Group from "@/app/components/group";
import Loading from "@/app/components/loading";
import { GroupItem } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function LoadGroup() {
  const searchParams = useSearchParams();
  const [group, setGroup] = useState<GroupItem>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/group/get/${searchParams.get("groupId")}`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setIsLoading(false);
      })
      .catch((err) => console.log("Error fetching group.", err));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Group
          id={Number(group?.id)}
          name={group?.name!}
          members={group?.members!}
        />
      )}
    </>
  );
}
