"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Francisco" }));

  return <div className="flex flex-col p-2 gap-2">{data?.greeting}</div>;
};
