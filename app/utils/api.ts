// utils/api.ts
import { getEnvConfig } from "@/configs/env";
export const api = $fetch.create({
  baseURL: "",
  timeout: 60000,

  onRequest({ options }) {
    const envConfig = getEnvConfig();
    options.baseURL = envConfig?.apiBaseUrl ?? "";
  },

  onResponseError({ response }) {
    //handle error response which want to do
  },
});
