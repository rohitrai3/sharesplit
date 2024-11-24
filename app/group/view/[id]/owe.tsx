"use client";

import Loading from "@/app/components/loading";
import { GetOweResponse } from "@/app/types";
import { useEffect, useState } from "react";
import Settle from "./settle";

export type OweProps = {
  groupId: number;
};

export default function Owe({ groupId }: OweProps) {
  const [getOweResponse, setGetOweResponse] = useState<GetOweResponse>({
    oweFromList: [],
    oweToList: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/owe/get`)
      .then((res) => res.json())
      .then((data) => setGetOweResponse(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log("Error fetching owe lsit: ", err));
  }, []);

  return (
    <div className="text-sm text-gold-light ml-6 space-y-2">
      {isLoading && <Loading />}
      {getOweResponse.oweFromList.map((oweFrom, index) => (
        <p key={index}>
          {oweFrom.name} owes ₹{oweFrom.amount} to you
        </p>
      ))}
      {getOweResponse.oweToList.map((oweTo, index) => (
        <p key={index}>
          You owe ₹{oweTo.amount} to {oweTo.name}{" "}
          <Settle groupId={groupId} name={oweTo.name} amount={oweTo.amount} />
        </p>
      ))}
    </div>
  );
}
