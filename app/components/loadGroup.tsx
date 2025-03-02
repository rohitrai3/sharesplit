import Group from "@/app/components/group";
import Loading from "@/app/components/loading";
import { GroupItem } from "@/app/types";
import { useEffect, useState } from "react";

export type LoadGroupProps = {
  id: number;
};

export function LoadGroup({ id }: LoadGroupProps) {
  const [group, setGroup] = useState<GroupItem>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/group/get/${id}`)
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
        <Loading name="group" />
      ) : (
        <Group
          id={Number(group?.id)}
          name={group?.name!}
          members={group?.members!}
          admin={group?.admin!}
          isAddMemberButtonVisible={false}
        />
      )}
    </>
  );
}
