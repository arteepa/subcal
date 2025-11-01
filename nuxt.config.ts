// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  // Enable devtools
  devtools: { enabled: true },
  
  // TypeScript strict mode
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  
  // TailwindCSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  },
  
  // App configuration
  app: {
    head: {
      title: 'subcal - Share Your Events',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Broadcast a calendar, let people subscribe. Use an .ICS or a regular Google, Apple, or Outlook calendar.' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Runtime configuration
  runtimeConfig: {
    public: {
      appName: 'subcal',
      apiBase: process.env.API_BASE || '',
      developmentMode: process.env.NODE_ENV === 'development'
    }
  },
  
  // Nitro configuration for server
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=604800, immutable' } },
      '/assets/**': { headers: { 'cache-control': 'public, max-age=604800, immutable' } }
    }
  },
  
  // CSS
  css: [
    '~/assets/css/main.css'
  ]
})

