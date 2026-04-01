// https://nuxt.com/docs/api/configuration/nuxt-config
import './loadEnv';

export default defineNuxtConfig({
  srcDir: 'app/',
  serverDir: 'server/',
  alias: {
    '~': './app',
    '@': './app',
    'assets': './assets',
    'public': './public'
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    geminiApiKey: process.env.GEMINI_API_KEY,
    neonApiKey: process.env.NEON_API_KEY,
    neonBranch: process.env.NEON_BRANCH,
    neonProjectId: process.env.NEON_PROJECT_ID,
    neonDatabaseUrl: process.env.NEON_DATABASE_URL,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-google-translate'
  ],

  googleTranslate: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr', 'es', 'de', 'sw']
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'sw', name: 'Kiswahili', file: 'sw.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
  },

  colorMode: {
    preference: 'light'
  },

  devtools: {
    enabled: true
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
        'marked'
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
