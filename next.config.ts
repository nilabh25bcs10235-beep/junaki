import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Home directory is a git root; pin Turbopack to this app.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
