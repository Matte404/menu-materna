import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const pwaConfig: Partial<VitePWAOptions> = {
  manifest: {
    name: 'Menu Materna 2023/24',
    short_name: 'Menu Materna',
    description: 'Menu scuola materna anno scolastico 2023/2024',
    theme_color: '#3dff54',
    icons: [
      {
        src: 'pwa-icon/pwa_x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-icon/pwa_x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)],
  base: '/menu-materna/'
})
