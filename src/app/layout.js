import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next JS and Open AI App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-indigo-50">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
