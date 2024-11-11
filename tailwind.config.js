// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azulOscuro: '#0b1b2e',       // Azul oscuro para el header
        azulIntermedio: '#1e3a8a',   // Azul intermedio para AboutUs
        azulClaro: '#004aad',
        verdeBoton: '#00c09a',
        blancoTexto: '#ffffff',
        grisClaro: '#d1d5db',
      },
    },
  },
  plugins: [],
};