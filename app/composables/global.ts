export const goBack = () => {
  const router = useRouter();
  router.back();
};

export const FormateDate = (value: Date | string) => {
  if (!value) return "";
  const dayjs = useDayjs();
  return dayjs(value).format("DD-MM-YYYY");
};

export const goPath = (path: string) => {
  if (!path) return;
  return navigateTo(path);
};

export const reloadPath = (path: string) => {
  if (!path) return;
  const base = useRuntimeConfig().app.baseURL;
  window.location.href = `${base}${path}`;
};

export const delayGoPath = (path: string, delay = 1200) => {
  if (!path) return;
  const base = useRuntimeConfig().app.baseURL;
  setTimeout(() => {
    window.location.href = `${base}${path}`;
  }, delay);
};
