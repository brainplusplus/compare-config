import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@/styles/styles.css';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Compare Config",
  description: "Web App to compare configuration for various type of file config",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-lg font-bold">Compare Config</div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-gray-400">Home</a></li>
                <li><a href="#" className="hover:text-gray-400">About</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            &copy; 2024 Brainplusplus. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
