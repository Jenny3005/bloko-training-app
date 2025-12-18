"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductsPage;
const react_1 = require("react");
const api_1 = require("@/lib/api");
const card_1 = require("@/components/ui/card");
const alert_1 = require("@/components/ui/alert");
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
function ProductsPage() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        loadProducts();
    }, []);
    const loadProducts = async () => {
        try {
            const data = await (0, api_1.fetchProducts)();
            setProducts(data.data || []);
        }
        catch (err) {
            setError("Impossible de charger les produits");
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return (<div className="p-8 bg-white min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Chargement des produits...</p>
        </div>
      </div>);
    if (error)
        return (<div className="p-8 bg-white min-h-screen">
        <alert_1.Alert variant="destructive" className="bg-red-50 border-red-200">
          <alert_1.AlertDescription className="text-black">{error}</alert_1.AlertDescription>
        </alert_1.Alert>
        <div className="mt-4">
          <link_1.default href="/dashboard">
            <button_1.Button variant="ghost" className="text-black">
              ← Retour au dashboard
            </button_1.Button>
          </link_1.default>
        </div>
      </div>);
    return (<div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Mes Produits</h1>
          <p className="text-black">
            {products.length} produit{products.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <link_1.default href="/dashboard/products/new">
          <button_1.Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Nouveau produit
          </button_1.Button>
        </link_1.default>
      </div>

      {products.length === 0 ? (<div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xl text-black mb-4">
            Aucun produit pour le moment
          </p>
          <p className="text-black mb-6">
            Commencez par créer votre premier produit
          </p>
          <link_1.default href="/dashboard/products/new">
            <button_1.Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Créer un produit
            </button_1.Button>
          </link_1.default>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (<card_1.Card key={product.id} className="border-gray-200">
              <card_1.CardHeader>
                <card_1.CardTitle className="text-black line-clamp-1">
                  {product.title}
                </card_1.CardTitle>
                <card_1.CardDescription className="text-black">
                  <span className="text-lg font-semibold text-green-600">
                    {product.price.toFixed(2)}€
                  </span>
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <p className="text-black line-clamp-3 mb-4">
                  {product.description}
                </p>
                <div className="text-xs text-gray-600">
                  ID: {product.id.slice(0, 8)}...
                </div>
              </card_1.CardContent>
            </card_1.Card>))}
        </div>)}

      <div className="mt-8 text-center">
        <link_1.default href="/dashboard">
          <button_1.Button variant="ghost" className="text-black hover:text-blue-600">
            ← Retour au dashboard
          </button_1.Button>
        </link_1.default>
      </div>
    </div>);
}
