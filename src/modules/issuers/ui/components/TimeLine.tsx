import { formatDate } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

const TimeLine = ({
  createdAt,
  status = "pending",
}: {
  createdAt: string;
  status?: string;
}) => {
  return (
    <div className="w-full rounded-sm shadow-sm p-5 space-y-5 border ">
      <h1 className="font-semibold">Timeline</h1>
      <div className="flex gap-5">
        <div className="flex flex-col justify-around gap-4 relative ">
          <div className="w-2 h-2 bg-yellow-500 rounded-full z-20  " />
          <div
            className={clsx(
              status === "approved" ? "bg-green-500 " : status === "rejected" ? "bg-red-500 " : "bg-yellow-500",
              "w-2 h-2 rounded-full z-20"
            )}
          />
          <div
            className={clsx(
              status === "approved"
                ? "h-[52%] bg-green-500"
                : status === "rejected"
                ? "h-[52%] bg-red-500"
                : "h-[42%] bg-yellow-500",
              "absolute z-10  bg-black w-[1.5px] left-[3.5px] top-7"
            )}
          />
        </div>
        <div className="space-y-5">
          {" "}
          <div>
            <p className="text-sm text-muted-foreground uppercase">
              Application Submitted
            </p>
            <h1 className="font-semibold mt-1">
              {formatDate(createdAt, "dd MMM yyyy")}
            </h1>
          </div>
          <div>
            <p className="text-sm text-muted-foreground uppercase">
              Awating Review
            </p>
            <h1 className="font-semibold mt-1 uppercase">{status}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
