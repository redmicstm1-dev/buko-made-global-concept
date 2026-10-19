import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

// Get the equivalent of __dirname in ES Modules / TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Tells Next.js to strictly use this project folder as the root
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
