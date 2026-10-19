import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { CartProvider } from "@/components/CartProvider";
import { site } from "@/lib/site";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata: Metadata = { title: { default: "Buko Made Global Concept | Medical Equipment & Hospital Supplies", template: "%s | Buko Made Global Concept" }, description: site.description, metadataBase: new URL(baseUrl), openGraph: { title: site.name, description: site.description, type: "website" } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><CartProvider><Header /><main>{children}</main><Footer /><WhatsAppFloat /></CartProvider></body></html>; }
