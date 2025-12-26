import { Noto_Sans_JP } from "next/font/google";
import Menu from "@/component/Menu";
import "./globals.css";
import Footer from "@/component/Footer";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased bg-base-100 text-base-content flex flex-col min-h-screen`}
      >
        <Menu />
        <div className="flex-grow container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
