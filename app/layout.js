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
  ],
  metadataBase: new URL("https://brain-teasers.co.in"),
  openGraph: {
    title: "Brain Teasers Books for Kids",
    description:
      "Improve your child's problem-solving skills with fun brain teaser workbooks.",
    url: "https://brain-teasers.co.in",
    siteName: "Brain Teasers Books",
    images: [
      {
        url: "/books/Landing-Img-1.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
