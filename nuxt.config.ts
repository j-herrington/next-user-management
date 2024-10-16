export default defineNuxtConfig({
  devtools: { enabled: false },
  components: true,
  css: ['@/assets/main.css'],  
  ssr: true,
  modules: [
    "@nuxt/ui",
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'system', 
    classSuffix: '', 
  },
  supabase: {
    redirect: false
  },
  
})