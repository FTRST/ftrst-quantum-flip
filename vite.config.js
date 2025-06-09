import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/QuantumCoinFlip.jsx'), // Path to the index file that exports your components
      name: 'ftrst-quantum-flip', // Global variable name when used in UMD format
      formats: ['es', 'umd'],
      fileName: (format) => `ftrst-quantum-flip.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark React and ReactDOM as external dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/**']
    }
  }
})
