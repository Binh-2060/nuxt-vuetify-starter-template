// core/api.ts
import { getEnvConfig } from "@/configs/env";
export const api = $fetch.create({
  baseURL: "",
  timeout: 60000,

  onRequest({ options }) {
    const envConfig = getEnvConfig();
    options.baseURL = envConfig?.apiBaseUrl ?? "";
  },

  // add app-wide hooks here when needed.
  // don't turn errors into UI here: apiRequest() throws ApiError and pages show it with catchError.

  // example: send the user to login when the session expires (401).
  // uncomment and change the path to your login page when your app has auth.
  // onResponseError({ response }) {
  //   if (response.status === 401) {
  //     navigateTo("/login");
  //   }
  // },
});
