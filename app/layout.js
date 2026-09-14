import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Brain Teasers Books for Kids | Educational Workbooks",
    template: "%s | Brain Teasers Books",
  },
  description:
    "Buy brain teaser books and educational workbooks for kids to improve critical thinking, logic, and creativity. PAN India delivery.",
  keywords: [
    "brain teaser books",
    "books for kids",
    "critical thinking books",
    "logic puzzles for kids",
    "educational workbooks India",
    "Nilshree books",
    "Brain Teasers for Juniors",
  ],
  metadataBase: new URL("https://brain-teasers.co.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brain Teasers Books for Kids | Educational Workbooks",
    description:
      "Buy brain teaser books and educational workbooks for kids to improve critical thinking and creativity. PAN India delivery.",
    url: "https://brain-teasers.co.in",
    siteName: "Brain Teasers Books",
    images: [
      {
        url: "/books/Landing-Img-1.png",
        width: 1200,
        height: 630,
        alt: "Brain Teasers Books for Kids",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Teasers Books for Kids",
    description: "Improve your child's problem-solving skills with fun brain teaser workbooks.",
    images: ["/books/Landing-Img-1.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brain Teasers Books",
    "url": "https://brain-teasers.co.in",
    "logo": "https://brain-teasers.co.in/logo.png",
    "description": "Educational workbooks and brain teaser books for children.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-YOUR-NUMBER",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Footer />
        <WhatsAppButton />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
