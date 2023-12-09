/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
}

export default config
