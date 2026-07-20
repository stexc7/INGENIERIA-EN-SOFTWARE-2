import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const isE2E = process.env.DISABLE_PWA === 'true'

const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
  manifest: {
    name: 'Salud Familiar',
    short_name: 'Salud Familiar',
    description: 'Gestiona tus citas medicas y recetas de forma sencilla y accesible.',
    lang: 'es',
    theme_color: '#0B5FA5',
    background_color: '#FFFFFF',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    icons: [
      { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  workbox: {
    navigateFallback: '/index.html',
    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
})

export default defineConfig({
  plugins: isE2E ? [react()] : [react(), pwaPlugin],
})
