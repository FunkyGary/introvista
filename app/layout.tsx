'use client';

import "reflect-metadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { UserProvider } from "@/contexts/user-context";
import { UserRoleProvider } from "@/contexts/user-role-context";
import { DIProvider } from "@/contexts/di-context";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <DIProvider>
          <ThemeProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={2_000}>
              <UserProvider>
                <UserRoleProvider>{children}</UserRoleProvider>
              </UserProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </DIProvider>
      </body>
    </html>
  );
}
