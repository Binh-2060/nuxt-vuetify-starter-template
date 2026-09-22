export default {
  VALIDATE: (v: string) => !!v || "This field is required",
  MAX_LENGTH: (max: number) => (v: string) =>
    !v || v.length <= max || `Maximum ${max} characters`,
};
