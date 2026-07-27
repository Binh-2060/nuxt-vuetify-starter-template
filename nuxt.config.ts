import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: false },

  ssr: false,

  compatibilityDate: "2026-02-25",

  //config that pure html css js generate
  //not server side mode
  nitro: {
    preset: "static",
  },

  runtimeConfig: {
    public: {
      BUILD_DATE: process.env.BUILD_DATE,
      APP_ENV: import.meta.env.VITE_APP_ENV ?? "local",
    },
  },

  app: {
    head: {
      title: "Nuxt4 + Vuetify Template",
    },
  },

  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
    {
      path: "@/components/global",
      pathPrefix: false,
      prefix: "global",
    },
  ],

  css: ["~/assets/css/style.scss", "~/assets/css/global.css"],

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
  ],

  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  //state management stores
  imports: {
    dirs: ["stores"],
  },

  //state management stores folder that pinia look up
  pinia: {
    storesDirs: ["stores/**"],
  },
});
