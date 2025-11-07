import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      aos: path.resolve(__dirname, 'node_modules/aos'),
    },
  },
  server: {
    proxy: {
      '/_events/api': {
        target: 'https://relaticpanama.org',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Librerías principales
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor_react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor_icons';
          }
          if (id.includes('node_modules/chart.js')) {
            return 'vendor_charts';
          }
          // Librerías pesadas comunes en formateadores/visores de documentos
          if (id.includes('node_modules/pdfjs-dist')) {
            return 'vendor_pdf';
          }
          if (id.includes('node_modules/docx')) {
            return 'vendor_docx';
          }
          if (id.includes('node_modules/mammoth')) {
            return 'vendor_mammoth';
          }
          if (id.includes('node_modules/xlsx')) {
            return 'vendor_xlsx';
          }
          if (id.includes('node_modules/quill')) {
            return 'vendor_quill';
          }

          // Componentes grandes separados
          if (id.includes('components/CertificateGenerator')) return 'CertificateGenerator';
          if (id.includes('components/CertificateList')) return 'CertificateList';
          if (id.includes('components/BooksMetrics')) return 'BooksMetrics';
          if (id.includes('components/CoursesMetrics')) return 'CoursesMetrics';
          if (id.includes('components/JournalMetrics')) return 'JournalMetrics';
          if (id.includes('components/PostersMetrics')) return 'PostersMetrics';
          if (id.includes('components/UpcomingActivities')) return 'UpcomingActivities';
          if (id.includes('components/PreviousActivities')) return 'PreviousActivities';
          if (id.includes('components/CreateOrcidGuide')) return 'CreateOrcidGuide';
          if (id.includes('components/SearchPage')) return 'SearchPage';
          if (id.includes('components/Carousel')) return 'Carousel';
          if (id.includes('components/Navbar')) return 'Navbar';
          if (id.includes('components/Footer')) return 'Footer';
          if (id.includes('components/Agreements')) return 'Agreements';
        },
      },
    },
    chunkSizeWarningLimit: 1200, // aumenta límite para advertencias, opcional
  },
});
