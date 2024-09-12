import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RecordsProvider } from '@/context/records-context';
import { SettingsProvider } from '@/context/settings-context';
import { Toaster } from '@/components/ui/toaster';
import MatomoInitializer from '@/components/ui/matomoInitializer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'WohnAlert',
    description: 'Freie Wohnungen in Berlin',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
            <body className={inter.className}>
                <MatomoInitializer />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
