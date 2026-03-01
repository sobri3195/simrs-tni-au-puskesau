import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? 'SIMRS TNI AU',
  description: 'SIMRS TNI AU - cepat, aman, terarah, 24/7'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
