// import { userTokenAtom } from "@/store";
// import {
//   UseQueryOptions,
//   UseQueryResult,
//   useQuery,
// } from "@tanstack/react-query";
// import { useAtomValue } from "jotai";

// export function useQueryWithToken<
//   TQueryKey extends [string, Record<string, unknown>?]
// >(queryKey: TQueryKey, fetcUrl: string) {
//   const userToken = useAtomValue(userTokenAtom);

//   return useQuery({
//     queryKey,
//     queryFn: async () => {
//       return fetch(fetcUrl, {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }).then((res) => res.json());
//     },
//   });
// }
