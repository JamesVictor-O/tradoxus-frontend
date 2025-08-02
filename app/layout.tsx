import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { ThemeProvider } from "@/context/ThemeContext";
import { WalletProvider } from "@/context/WalletProviderContext";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { LanguageSwitcherWrapper } from "@/components/LanguageSwitcherWrapper";
import { ClientOnly } from "@/components/ClientOnly";
import { HeaderFallback } from "@/components/HeaderFallback";
import { FooterFallback } from "@/components/FooterFallback";
import { LanguageSwitcherFallback } from "@/components/LanguageSwitcherFallback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tradoxus",
  description: "Interactive trading education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <WalletProvider>
            <ThemeProvider>
                                      <div className="min-h-[calc(100vh-85px)]">
              <ClientOnly fallback={<HeaderFallback />}>
                <Header />
              </ClientOnly>
              {children}
            </div>
            <ClientOnly fallback={<FooterFallback />}>
              <Footer />
            </ClientOnly>
            <ClientOnly fallback={<LanguageSwitcherFallback />}>
              <LanguageSwitcherWrapper />
            </ClientOnly>
            </ThemeProvider>
          </WalletProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
