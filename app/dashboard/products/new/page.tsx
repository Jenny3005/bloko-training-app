"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      setError("Tous les champs sont obligatoires");
      setLoading(false);
      return;
    }

    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError("Le prix doit être un nombre positif");
      setLoading(false);
      return;
    }

    try {
      await createProduct({
        title: formData.title,
        description: formData.description,
        price: priceValue,
      });
      router.push("/dashboard/products");
    } catch (err) {
      setError("Erreur lors de la création du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Créer un produit
          </h1>
          <p className="text-black">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>

        {/* Formulaire */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-white">
            <CardTitle className="text-xl font-semibold text-black">
              Informations du produit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertDescription className="text-black">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Champ Titre */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-black font-medium">
                  Titre *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                  className="border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-blue-500"
                  placeholder="Nom du produit"
                  disabled={loading}
                />
              </div>

              {/* Champ Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-black font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  className="border-gray-300 bg-white text-black placeholder:text-gray-500 min-h-30 focus:border-blue-500"
                  placeholder="Décrivez votre produit..."
                  disabled={loading}
                />
              </div>

              {/* Champ Prix */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-black font-medium">
                  Prix (€) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                  className="border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-blue-500"
                  placeholder="0.00"
                  disabled={loading}
                />
                <p className="text-sm text-gray-600">
                  Exemple : 19.99 pour 19,99€
                </p>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                >
                  {loading ? "Création en cours..." : "Créer le produit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lien retour */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/products")}
            className="text-black hover:text-blue-600"
          >
            ← Retour à la liste
          </Button>
        </div>
      </div>
    </div>
  );
}
