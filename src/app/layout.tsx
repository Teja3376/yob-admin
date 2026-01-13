import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexa Admin - SaaS Console",
  description: "Enterprise SaaS Administration Console",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
        <Toaster theme="light" richColors  position="top-right"  />
      </body>
    </html>
  );
}
