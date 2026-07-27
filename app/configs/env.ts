//file extend or global config env (not sensitive data)
//don't store sensitive data in here
const envConfig: Record<string, { apiBaseUrl: string }> = {
  develop: { apiBaseUrl: "" },
  production: { apiBaseUrl: "" },
  local: { apiBaseUrl: "" },
};

export const getEnvConfig = () => {
  const env = import.meta.env.VITE_APP_ENV ?? "develop";
  return envConfig[env] ?? envConfig.develop;
};
