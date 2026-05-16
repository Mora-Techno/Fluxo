import { metadata, siteConfig } from './metadata';
import '@/styles/globals.css';
import { AppProviders } from './providers';

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body className="font-parkinsans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
