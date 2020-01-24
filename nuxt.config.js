
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic' },

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/vendor/fontawesome-free/css/all.min.css',
    '~/assets/vendor/simple-line-icons/css/simple-line-icons.css',
    '~/assets/css/landing-page.min.css',

  ],
  /*
  ** Plugins to load before mounting the App
  */
//  axios: {
//    baseURL: 'http://localhost:3535/',
//    headers: {

//    }
//  },
  plugins: [

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [

  ],
  router :{
  },
  scripts: [
    '~/assets/vendor/jquery/jquery.min.js',
    '~/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
   ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}