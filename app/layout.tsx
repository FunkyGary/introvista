import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { UserProvider } from "@/contexts/user-context";
import { UserRoleProvider } from "@/contexts/user-role-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntroVista",
  description: "IntroVista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <UserProvider>
            <UserRoleProvider>{children}</UserRoleProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
