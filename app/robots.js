export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://brain-teasers.co.in/sitemap.xml",
  };
}