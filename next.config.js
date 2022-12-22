module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL:
      "mongodb+srv://sasco:PQVfrcunWCSnuahL@cluster0.rurqpn4.mongodb.net/carbonEmissiondb?retryWrites=true&w=majority",
    DB_LOCAL: "mongodb://localhost:27017/carbonEmissiondb",
    JWT_SECRET: "sfskftsfdssdsp34050eeie59o53H530smdslf",
    SENDGRID_API_KEY:
      "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",
    CLOUDINARY_API_SECRET: "3XTliwBlg5oYWFIIbfXWByvEQw0",
  },
  images: {
    unoptimized: true,

    domains: ["res.cloudinary.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
