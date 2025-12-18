import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-black hover:text-gray-700 cursor-pointer transition-colors">
              Dashboard
            </h1>
          </Link>
          <nav className="flex gap-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-black hover:text-gray-900 hover:bg-gray-100"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button
                variant="ghost"
                className="text-black hover:text-gray-900 hover:bg-gray-100"
              >
                Produits
              </Button>
            </Link>
            <Link href="/dashboard/products/new">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Nouveau produit
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-7xl mx-auto p-6 bg-white">{children}</main>
    </div>
  );
}
