import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import "./globals.css";
import HeartsModal from "@/components/modals/heart-modal";

const font = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#22C55E",
};

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  title: {
    default: "LingoLearner by Tanish",
    template: "%s - LingoLearner by Tanish garg",
  },
  description:
    "Dive into the world of languages with Leaf. Master new languages, enhance your skills, and unfold your potential. Start your linguistic journey with Leaf today!",
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "w3roI87t-dIyKe7ReAdSWUVpWCe7K1pP_EXUidsZ3xI",
    me: "KMaar",
  },
  keywords: [
    "reactjs",
    "nextjs",
    "vercel",
    "react",
    "Tanish garg",
    "LEAF",
    "duolingo-clone",
    "learn-language",
    "shadcn",
    "shadcn-ui",
    "radix-ui",
    "cn",
    "clsx",
    "lingo",
    "postgresql",
    "sonner",
    "drizzle",
    "zustand",
    "mysql",
    "lucide-react",
    "next-themes",
    "clerk-themes",
    "clerk",
    "postcss",
    "prettier",
    "react-dom",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
  ],
  authors: {
    name: "Tanish garg",
    url: "https://tanishgarg.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#22C55E",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
