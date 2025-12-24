import { Noto_Sans_JP } from "next/font/google";
import Menu from "@/component/Menu";
import "./globals.css";

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
        className={`${notoSans.className} antialiased`}
      >
        <Menu />
        {children}
      </body>
    </html>
  );
}
