import "@/styles/globals.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import { Provider } from "@/components/provider";
import TopBar from "@/components/Menu/TopBar/top-bar";


const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Análise de Referências",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
            <Provider>
                <TopBar />
                {children}
            </Provider>
        </body>
      </html>
  );
}
