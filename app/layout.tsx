import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'FitMatch AI',
  description: 'Mobile-first fashion matching assistant'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>FitMatch AI</strong>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/">Home</Link>
              <Link href="/upload">Upload</Link>
              <Link href="/color">Color</Link>
              <Link href="/saved">Saved</Link>
              <Link href="/settings">Settings</Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
