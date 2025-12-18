"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data.data || []);
    } catch (err) {
      setError("Impossible de charger les produits");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 bg-white min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Chargement des produits...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 bg-white min-h-screen">
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertDescription className="text-black">{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-black">
              ← Retour au dashboard
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Mes Produits</h1>
          <p className="text-black">
            {products.length} produit{products.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Nouveau produit
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xl text-black mb-4">
            Aucun produit pour le moment
          </p>
          <p className="text-black mb-6">
            Commencez par créer votre premier produit
          </p>
          <Link href="/dashboard/products/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Créer un produit
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black line-clamp-1">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-black">
                  <span className="text-lg font-semibold text-green-600">
                    {product.price.toFixed(2)}€
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black line-clamp-3 mb-4">
                  {product.description}
                </p>
                <div className="text-xs text-gray-600">
                  ID: {product.id.slice(0, 8)}...
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-black hover:text-blue-600">
            ← Retour au dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
