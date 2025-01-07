import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NhostClientProvider } from "@/components/providers/nhost-provider";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NhostClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="min-h-screen w-screen bg-background text-foreground">
              <SidebarProvider>
                <Navbar />
                <main>{children}</main>
                <Toaster />
              </SidebarProvider>
            </div>
          </ThemeProvider>
        </NhostClientProvider>
      </body>
    </html>
  );
}
