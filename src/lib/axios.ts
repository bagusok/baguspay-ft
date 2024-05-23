// // @ts-ignore
// import axios from "axios";

import axios from "axios";
import { generateSignature } from "./utils";

// // const axiosWithToken = axios.create({
// //   headers: {
// //     Authorization: `Bearer ${localStorage
// //       .getItem("token")
// //       ?.replaceAll('"', "")}`,
// //   },
// // });

export const axiosIn = axios.create({
  headers: {
    "x-signature": generateSignature(),
  },
});

axiosIn.interceptors.request.use((config: any) => {
  const deviceId = localStorage.getItem("deviceId")?.replaceAll('"', "");

  if (deviceId) {
    return {
      ...config,
      headers: {
        ...config.headers,
        ["x-device-id"]: deviceId,
      },
    };
  }
  return config;
});
