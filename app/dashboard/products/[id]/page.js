"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductDetailPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const alert_1 = require("@/components/ui/alert");
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
function ProductDetailPage() {
    const params = (0, navigation_1.useParams)();
    const router = (0, navigation_1.useRouter)();
    const [product, setProduct] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        loadProduct();
    }, []);
    const loadProduct = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products/${params.id}`);
            const data = await response.json();
            if (data.success) {
                setProduct(data.data);
            }
            else {
                setError("Produit non trouvé");
            }
        }
        catch (err) {
            setError("Erreur lors du chargement");
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        if (!confirm("Voulez-vous vraiment supprimer ce produit ?"))
            return;
        try {
            const response = await fetch(`${API_URL}/api/products/${params.id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                router.push("/dashboard/products");
            }
            else {
                alert("Erreur lors de la suppression");
            }
        }
        catch (err) {
            alert("Erreur réseau");
        }
    };
    if (loading)
        return <div className="p-8 text-black">Chargement...</div>;
    if (error || !product) {
        return (<alert_1.Alert variant="destructive" className="bg-red-50 border-red-200">
        <alert_1.AlertDescription className="text-black">
          {error || "Produit non trouvé"}
        </alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    return (<div className="max-w-2xl mx-auto p-8">
      <card_1.Card className="border-gray-200">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-black">{product.title}</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
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
            <button_1.Button variant="outline" onClick={() => router.back()} className="text-black border-gray-300">
              Retour
            </button_1.Button>
            <button_1.Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </button_1.Button>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
