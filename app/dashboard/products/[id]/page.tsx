"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      } else {
        setError("Produit non trouvé");
      }
    } catch (err) {
      setError("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      const response = await fetch(`${API_URL}/api/products/${params.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/dashboard/products");
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  if (loading) return <div className="p-8 text-black">Chargement...</div>;

  if (error || !product) {
    return (
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertDescription className="text-black">
          {error || "Produit non trouvé"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-700">Description</p>
            <p className="text-lg text-black">{product.description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Prix</p>
            <p className="text-2xl font-bold text-black">{product.price}€</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Créé le</p>
            <p className="text-black">
              {new Date(product.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="text-black border-gray-300"
            >
              Retour
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
