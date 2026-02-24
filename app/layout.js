import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@/Libs/Custom Css/scrollbar.css";
import ClientProvider from "@/Providers/ReduxProvider";
import { vapi_public_key } from "@/env";
import { VapiProvider } from "@/Providers/VapiAgentProvider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IVR Appointment Automation | Betopia Group",
  description:
    "Automate your appointment scheduling with our AI-powered IVR solutions. Available 24/7 to handle bookings and reduce operational costs.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "IVR Appointment Automation | Betopia Group",
    description:
      "Automate your appointment scheduling with our AI-powered IVR solutions. Available 24/7 to handle bookings and reduce operational costs.",
    images: [
      {
        url: "/Main Image/logo.webp",
        width: 1200,
        height: 630,
        alt: "IVR Appointment Automation | Betopia Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVR Appointment Automation | Betopia Group",
    description:
      "Automate your appointment scheduling with our AI-powered IVR solutions. Available 24/7 to handle bookings and reduce operational costs.",
    images: [
      {
        url: "/Main Image/logo.webp",
        width: 1200,
        height: 630,
        alt: "IVR Appointment Automation | Betopia Group",
      },
    ],
  },
  themeColor: "#0B1120",
  keywords: [
    "IVR",
    "Appointment Automation",
    "AI Voice Technology",
    "Betopia Group",
    "Voice Appointment System",
    "Voice Booking System",
    "Voice Scheduling System",
    "Voice Scheduling Automation",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <VapiProvider vapi_public_key={vapi_public_key}>
            {children}
          </VapiProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
