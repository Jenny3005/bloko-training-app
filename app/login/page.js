"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const card_1 = require("@/components/ui/card");
const alert_1 = require("@/components/ui/alert");
const link_1 = __importDefault(require("next/link"));
function LoginPage() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // Validation côté client
        if (!email.trim() || !password.trim()) {
            setError("Veuillez remplir tous les champs");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Veuillez entrer un email valide");
            return;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }
        setLoading(true);
        // TODO: appeler l'API back-end
        console.log("Login attempt:", { email, password });
        // Simulation
        setTimeout(() => {
            if (email === "test@test.com" && password === "password") {
                console.log("Login success!");
                // En production, vous redirigerez vers le dashboard
                // router.push('/dashboard');
            }
            else {
                setError("Email ou mot de passe incorrect");
            }
            setLoading(false);
        }, 1000);
    };
    return (<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <card_1.Card className="w-full max-w-md border-blue-100 shadow-lg">
        <card_1.CardHeader className="text-center">
          <card_1.CardTitle className="text-2xl font-bold text-black">
            Connexion
          </card_1.CardTitle>
          <card_1.CardDescription className="text-black">
            Connectez-vous à votre compte
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (<alert_1.Alert variant="destructive" className="bg-red-50 border-red-200">
                <alert_1.AlertDescription className="text-black">
                  {error}
                </alert_1.AlertDescription>
              </alert_1.Alert>)}

            <div className="space-y-2">
              <label_1.Label htmlFor="email" className="text-black font-medium">
                Email
              </label_1.Label>
              <input_1.Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="votre@email.com" disabled={loading}/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="password" className="text-black font-medium">
                Mot de passe
              </label_1.Label>
              <input_1.Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="motdepasse" disabled={loading}/>
            </div>

            <button_1.Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" disabled={loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button_1.Button>

            <div className="text-center pt-4">
              <p className="text-sm text-black">
                Pas encore de compte ?{" "}
                <link_1.default href="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  S'inscrire
                </link_1.default>
              </p>
              <link_1.default href="/" className="inline-block mt-2 text-sm text-black hover:text-gray-800 hover:underline">
                ← Retour à l'accueil
              </link_1.default>
            </div>
          </form>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
