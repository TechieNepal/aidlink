import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isPages = process.env.GITHUB_PAGES === 'true'
const repo = process.env.REPO_NAME || '' // set in deploy action

export default defineConfig({
  plugins: [react()],
  base: isPages && repo ? `/${repo}/` : '/',
})