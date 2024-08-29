import type { Metadata } from "next";
import { Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-sans"
 });

export const metadata: Metadata = {
  title: "UrbanNet",
  description:"An inter-departmental platform in Indian cities for unified data sharing, resource coordination, and streamlined project execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-light-200 font-sans antialiased",
          fontSans.variable
        )}>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark">
            {children}
          </ThemeProvider>
          </body>
    </html>
  );
}
