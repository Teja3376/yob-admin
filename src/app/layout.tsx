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
  title: "YOB Assets Super Admin Panel",
  description:
    "YOB Assets Super admin portal for managing asset records, internal users, approvals, and operational configurations securely.",

  keywords: [
    "YOB Assets",
    "YOB super admin portal",
    "asset management super admin",
    "internal asset dashboard",
    "super admin login",
    "asset approvals",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "YOB Assets Admin Portal",
    description:
      "Secure administration portal for YOB Assets to manage assets, users, and internal operations.",
    type: "website",
  },
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
        <Toaster theme="light"  position="bottom-left" />
      </body>
    </html>
  );
}
