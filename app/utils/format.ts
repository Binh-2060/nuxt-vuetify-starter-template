// utils/format.ts
// pure helpers: no Nuxt, router or window, so they can be tested on their own
export const formatNumber = (value: number | null, decimal = 0): string => {
  if (value === null || isNaN(value)) return "";
  const [intPart = "", decPart] = value.toFixed(decimal).split(".");
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
};
