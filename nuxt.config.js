import bodyParser from "body-parser";

export default {
  // mode: 'universal',
  /*
   ** Headers of the page
   */
  target: "static",
  ssr: false,
  environment: process.env.NODE_ENV || "development",
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost",
  },
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/vendor/fontawesome-free/css/all.min.css",
    "~/assets/vendor/simple-line-icons/css/simple-line-icons.css",
    "~/assets/css/landing-page.css",
    "~/assets/css/custom.css",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  //  axios: {
  //    baseURL: process.env.BASEURI,
  //    headers: {

  //    }
  //  },
  plugins: [
    "~/plugins/moment",
    "~/plugins/vuepaginate",
    "~/plugins/prettycheckbox",
    "~/plugins/vue-slide-toggle",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  router: {},
  generate: {
    fallback: true,
  },
  scripts: ["https://kit.fontawesome.com/b1f8671d0b.js"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: true,
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
    standalone: true,
  },

  server: {
    port: process.env.PORT || 4000, // default: 3000
    host: process.env.HOST || "0.0.0.0", // default: localhost
  },

  serverMiddleware: [
    bodyParser.json({ limit: "50mb" }),
    // '~/api'
    { path: "~/api", handler: "~/api/index" },
  ],
};
