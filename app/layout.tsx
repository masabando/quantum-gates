"use client"
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Menu from "@/component/Menu";
import Footer from "@/component/Footer";
import Sidebar from "@/component/Sidebar";
import { useState } from "react";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarChecked, setSidebarChecked] = useState(false);
  return (
    <html lang="ja">
      <body
        className={`${notoSans.className} antialiased bg-base-100 text-base-content`}
      >
        <head>
          <meta name="description" content="A JavaScript library for simulating 1-qubit quantum gates and Composite Gates." />
          <meta name="keywords" content="quantum gates, composite gates, quantum computing, simulation, Composite Quantum Gates, JavaScript, TypeScript" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="quantum-gates" />
          <meta property="og:site_name" content="quantum-gates" />
          <meta
            property="og:description"
            content="A JavaScript library for simulating 1-qubit quantum gates and Composite Gates."
          />
          <meta
            property="og:image"
            content="https://masabando.github.io/quantum-gates/quantum-gates.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://masabando.github.io/quantum-gates/quantum-gates.png"
          />
        </head>
        <div className="min-h-screen flex flex-col">
          <Menu />
          <div className="drawer lg:drawer-open flex-grow">
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={sidebarChecked}
              onChange={(e) => setSidebarChecked(e.target.checked)}
            />
            <div className="drawer-content flex flex-col">
              <div className="flex-grow mx-auto w-full px-4">
                {children}
              </div>
            </div>
            <Sidebar setSidebarChecked={setSidebarChecked} />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
