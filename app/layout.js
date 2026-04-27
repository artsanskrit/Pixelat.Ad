import localFont from "next/font/local";
import "./globals.css";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import siteData from "@/data/site.json";

export const metadata = {
  title: `${siteData.name} | ${siteData.tagline}`,
  description: siteData.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <Cursor />
        <NoiseOverlay />
        <Navbar />
        
        <main>{children}</main>
        
        <Footer siteData={siteData} />
      </body>
    </html>
  );
}
