import colors from "vuetify/es5/util/colors";

export default {
  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || "http://localhost:8080",
    backendBaseUrl:
      process.env.BACKEND_BASE_URL || "http://localhost:3000/api/v1",
    imageUrl: process.env.IMAGE_URL || "http://localhost:3000",
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "FiveMovies",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "FiveMovies, #私を構成する映画, 作成, ツイッター, Twitter, ハッシュタグ, 映画, 共有, シェア, 私を構成する9枚, #私を構成する9枚",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content: "自分の人生に影響を与えた5本の映画をシェアするサービスです。",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "FiveMovies",
      },
      { hid: "og:type", property: "og:type", content: "article" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.five-movies.net/",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "FiveMovies",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "自分の人生に影響を与えた映画をシェアするサービスです。",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://www.five-movies.net/thumbnail.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@engineer_newbie" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "@/plugins/infiniteloading" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/google-gtag",
  ],

  "google-gtag": {
    id: "G-GRNJYT63FV",
    debug: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
