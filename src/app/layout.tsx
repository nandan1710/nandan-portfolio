import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nandan N N | Electronics & Instrumentation Engineering",
  description:
    "Portfolio of Nandan N N — Electronics & Instrumentation Engineering undergraduate specializing in Embedded Systems, FPGA, digital design, real-time control and electronics.",
  keywords: [
    "Nandan N N",
    "Embedded Systems",
    "Electronics & Instrumentation",
    "SJCE Mysore",
    "STM32",
    "Verilog HDL",
    "FPGA",
    "QuestaSim",
    "ModelSim",
    "PID Control",
    "Real-time Firmware",
    "I2C",
    "UART",
    "SPI",
    "Digital Design",
  ],
  authors: [{ name: "Nandan N N", url: "https://github.com/nandan1710" }],
  creator: "Nandan N N",
  openGraph: {
    title: "Nandan N N | Electronics & Instrumentation Engineering",
    description:
      "Portfolio of Nandan N N — Electronics & Instrumentation Engineering undergraduate specializing in Embedded Systems, FPGA, digital design, real-time control and electronics.",
    url: "https://nandan-portfolio.vercel.app",
    siteName: "Nandan N N Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nandan N N | Electronics & Instrumentation Engineering",
    description:
      "Portfolio of Nandan N N — Electronics & Instrumentation Engineering undergraduate specializing in Embedded Systems, FPGA, digital design, real-time control and electronics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#121316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#fafafa] dark:bg-[#121316] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-brand-cyan selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
