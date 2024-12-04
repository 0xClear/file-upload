/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Add rule for handling SVG files
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],  // Use @svgr/webpack to import SVG as a React component
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  