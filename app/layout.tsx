import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bloko Training",
  description: "Gestionnaire de produits",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
