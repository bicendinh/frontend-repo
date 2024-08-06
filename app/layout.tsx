"use client";
import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "../store/store";
import theme from "../theme/theme";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
