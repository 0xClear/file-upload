import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "File Upload App",
  description: "Learning purpose ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={`${inter.className } bg-main`}>{children}</body>
    </html>
  );
}
