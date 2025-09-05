import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  base: "/project-VELORA/",
  build: {
    chunkSizeWarningLimit: 600,
    
    rollupOptions: {
      output: {
        // Use function-based chunking to avoid dependency resolution issues
        manualChunks(id) {
          // React core
          if (id.includes('react') && !id.includes('react-router')) {
            return 'react-vendor';
          }
          
          // React Router
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Framer Motion - the big one we saw in the visualizer
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          
          // HeroUI packages
          if (id.includes('@heroui/react')) {
            return 'heroui-main';
          }
          
          if (id.includes('@heroui/system') || id.includes('@heroui/theme')) {
            return 'heroui-system';
          }
          
          // Group interactive HeroUI components
          if (id.includes('@heroui/button') || 
              id.includes('@heroui/input') || 
              id.includes('@heroui/select') || 
              id.includes('@heroui/modal') || 
              id.includes('@heroui/dropdown') ||
              id.includes('@heroui/switch')) {
            return 'heroui-interactive';
          }
          
          // Group display HeroUI components
          if (id.includes('@heroui/card') || 
              id.includes('@heroui/avatar') || 
              id.includes('@heroui/badge') || 
              id.includes('@heroui/chip') || 
              id.includes('@heroui/image') || 
              id.includes('@heroui/progress') || 
              id.includes('@heroui/skeleton')) {
            return 'heroui-display';
          }
          
          // Group navigation HeroUI components
          if (id.includes('@heroui/navbar') || 
              id.includes('@heroui/breadcrumbs') || 
              id.includes('@heroui/link') || 
              id.includes('@heroui/tabs') || 
              id.includes('@heroui/drawer')) {
            return 'heroui-nav';
          }
          
          // Group utility HeroUI components
          if (id.includes('@heroui/')) {
            return 'heroui-utils';
          }
          
          // React Aria (we saw this was large in the visualizer)
          if (id.includes('@react-aria')) {
            return 'react-aria';
          }
          
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Utilities
          if (id.includes('clsx') || 
              id.includes('tailwind-variants') || 
              id.includes('react-responsive')) {
            return 'utils';
          }
          
          // Default vendor chunk for other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});