import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Dev-only: the app is shared via a cloudflared quick tunnel for demo
  // access, which puts it on a different origin than localhost. Without
  // this, Next.js's dev-mode cross-origin protection silently blocks the
  // dev client resources needed for hydration/interactivity — pages load
  // and look fine, but every onClick/onChange handler is inert. See
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
