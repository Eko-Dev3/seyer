/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,      // Modo estricto de React en desarrollo
  trailingSlash: true,        // URLs terminan con "/" si así lo prefieres
  images: {
    unoptimized: false,       // Permite la optimización de imágenes
    // No necesitas configurar 'domains' si usas imágenes locales en /public
  },
};

module.exports = nextConfig;
