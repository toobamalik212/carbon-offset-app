import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // The copied Untitled UI files import each other as "@/components/..." and "@/utils/...".
    // "@" points at the copied folder, which mirrors the upstream repo root, so the files stay unchanged.
    alias: { '@': path.resolve(import.meta.dirname, 'src/components/untitled') },
  },
})
