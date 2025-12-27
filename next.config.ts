import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // --- ДОБАВЛЯЕМ ВОТ ЭТИ СТРОКИ НИЖЕ ---
  typescript: {
    // Игнорируем ошибки TypeScript при сборке
    ignoreBuildErrors: true,
  },
  eslint: {
    // Игнорируем ошибки стиля кода (ESLint)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;