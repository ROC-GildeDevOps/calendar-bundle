import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
