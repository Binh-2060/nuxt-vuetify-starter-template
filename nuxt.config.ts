import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,

  compatibilityDate: "2026-02-25",

  app: {
    head: {
      title: "Nuxt-Start + Vuetify Template",
    },
  },

  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],

  css: ["~/assets/css/style.scss"],

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
    locales: ["en", "lo"],
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

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },
});
