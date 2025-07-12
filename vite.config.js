import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss'; // ✅ Add this
import autoprefixer from 'autoprefixer'; // ✅ If you're using it

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),    // ✅ Now this works
        autoprefixer()    // ✅ Optional
      ]
    }
  }
});
