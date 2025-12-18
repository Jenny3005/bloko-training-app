"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewProductPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const api_1 = require("@/lib/api");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const card_1 = require("@/components/ui/card");
const alert_1 = require("@/components/ui/alert");
function NewProductPage() {
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = (0, react_1.useState)({
        title: "",
        description: "",
        price: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!formData.title.trim() ||
            !formData.description.trim() ||
            !formData.price) {
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
            await (0, api_1.createProduct)({
                title: formData.title,
                description: formData.description,
                price: priceValue,
            });
            router.push("/dashboard/products");
        }
        catch (err) {
            setError("Erreur lors de la création du produit");
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    return (<div className="min-h-screen bg-white p-8">
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
        <card_1.Card className="border-gray-200 shadow-sm">
          <card_1.CardHeader className="bg-white">
            <card_1.CardTitle className="text-xl font-semibold text-black">
              Informations du produit
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (<alert_1.Alert variant="destructive" className="bg-red-50 border-red-200">
                  <alert_1.AlertDescription className="text-black">
                    {error}
                  </alert_1.AlertDescription>
                </alert_1.Alert>)}

              {/* Champ Titre */}
              <div className="space-y-2">
                <label_1.Label htmlFor="title" className="text-black font-medium">
                  Titre *
                </label_1.Label>
                <input_1.Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} required className="border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-blue-500" placeholder="Nom du produit" disabled={loading}/>
              </div>

              {/* Champ Description */}
              <div className="space-y-2">
                <label_1.Label htmlFor="description" className="text-black font-medium">
                  Description *
                </label_1.Label>
                <textarea_1.Textarea id="description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} required className="border-gray-300 bg-white text-black placeholder:text-gray-500 min-h-30 focus:border-blue-500" placeholder="Décrivez votre produit..." disabled={loading}/>
              </div>

              {/* Champ Prix */}
              <div className="space-y-2">
                <label_1.Label htmlFor="price" className="text-black font-medium">
                  Prix (€) *
                </label_1.Label>
                <input_1.Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} required className="border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-blue-500" placeholder="0.00" disabled={loading}/>
                <p className="text-sm text-gray-600">
                  Exemple : 19.99 pour 19,99€
                </p>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <button_1.Button type="button" variant="outline" onClick={() => router.back()} disabled={loading} className="border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black">
                  Annuler
                </button_1.Button>
                <button_1.Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  {loading ? "Création en cours..." : "Créer le produit"}
                </button_1.Button>
              </div>
            </form>
          </card_1.CardContent>
        </card_1.Card>

        {/* Lien retour */}
        <div className="mt-6 text-center">
          <button_1.Button variant="ghost" onClick={() => router.push("/dashboard/products")} className="text-black hover:text-blue-600">
            ← Retour à la liste
          </button_1.Button>
        </div>
      </div>
    </div>);
}
