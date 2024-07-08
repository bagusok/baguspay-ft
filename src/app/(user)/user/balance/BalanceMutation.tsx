"use client";

import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { cn, parseDateWhithoutTime, priceFormat } from "@/lib/utils";
import { userTokenAtom } from "@/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function BalanceMutatiopn() {
  const { ref, inView } = useInView();

  const userToken = useAtomValue(userTokenAtom);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["balanceMutationHistory"],
      queryFn: ({ pageParam }) =>
        axiosIn
          .get(`${apiUrl}/users/balance/mutation?page=${pageParam}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((res) => res.data.data),
      initialPageParam: 1,
      getNextPageParam(lastPage, allPages) {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const mutationData = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    });
  }, [data]);

  console.log(mutationData);

  return (
    <>
      <div className="w-full bg-background px-4 py-3 md:p-0">
        <ul className="mt-3 md:mt-0 w-full">
          {mutationData?.map((item: any, i: number) => (
            <Fragment key={item.id}>
              {parseDateWhithoutTime(item.createdAt) !==
                parseDateWhithoutTime(mutationData[i - 1]?.createdAt) && (
                <h2
                  className={cn("text-sm font-semibold mt-4 my-2", {
                    "mt-0": i === 0,
                  })}
                >
                  {parseDateWhithoutTime(item.createdAt)}
                </h2>
              )}
              <li className="w-full inline-flex justify-between items-center py-4 border-b">
                <div className="inline-flex gap-2 items-center">
                  {item.type == "IN" ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                        stroke="#27AE60"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14.5 11L12 13.5L9.5 11"
                        stroke="#27AE60"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9.5 13L12 10.5L14.5 13"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <div>
                    <p className="text-base font-normal">{item.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.refId}
                    </p>
                  </div>
                </div>
                <p
                  className={cn({
                    "text-green-500": item.type == "IN",
                    "text-red-500": item.type == "OUT",
                  })}
                >
                  {item.type == "OUT" && "-"}
                  {priceFormat(item.amount)}
                </p>
              </li>
            </Fragment>
          ))}
        </ul>
        <div ref={ref}></div>
      </div>
    </>
  );
}
