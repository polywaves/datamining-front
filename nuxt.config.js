export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lens-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  plugins: [
    "~/plugins/vee-validate.js"
  ],
  build: {
    transpile: ["vee-validate/dist/rules"],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    BaseURL: process.env.API_URL, // Used as fallback if no runtime config is provided
  },

  auth: {
    strategies: {
      'jwt': {
        provider: 'laravel/jwt',
        url: process.env.API_URL,
      },
    }
  }
}
