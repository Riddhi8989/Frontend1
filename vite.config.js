import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';      // ✅ Required import
import autoprefixer from 'autoprefixer';    // ✅ Optional, but common

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),       // ✅ Now defined
        autoprefixer()       // ✅ Optional
      ]
    }
  }
});
