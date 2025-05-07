/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Asegura que el proyecto sea exportado como estático
    trailingSlash: true, // Agrega una barra inclinada al final de cada URL
    reactStrictMode: true, // Opcional: activa el modo estricto para mejores prácticas de desarrollo
    // Puedes agregar más configuraciones si es necesario
  };
  
  module.exports = nextConfig;
  