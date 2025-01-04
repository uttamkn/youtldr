import { Inter } from 'next/font/google';
import './globals.css';
import { NhostClientProvider } from '@/components/providers/nhost-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NhostClientProvider>
          <main className="min-h-screen bg-gray-950">
            {children}
          </main>
        </NhostClientProvider>
      </body>
    </html>
  );
}