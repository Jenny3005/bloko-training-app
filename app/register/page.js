"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const card_1 = require("@/components/ui/card");
const alert_1 = require("@/components/ui/alert");
const link_1 = __importDefault(require("next/link"));
function RegisterPage() {
    const router = (0, navigation_1.useRouter)();
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const validateForm = () => {
        const newErrors = {};
        // Validation du prénom
        if (!formData.firstName.trim()) {
            newErrors.firstName = "Le prénom est requis";
        }
        // Validation du nom
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Le nom est requis";
        }
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "L'email est requis";
        }
        else if (!emailRegex.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide";
        }
        // Validation du mot de passe
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        }
        else if (formData.password.length < 6) {
            newErrors.password =
                "Le mot de passe doit contenir au moins 6 caractères";
        }
        // Validation de la confirmation du mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        // Effacer l'erreur du champ quand l'utilisateur commence à taper
        if (errors[id]) {
            setErrors((prev) => ({
                ...prev,
                [id]: "",
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        // Simulation d'appel API
        console.log("Registration attempt:", formData);
        setTimeout(() => {
            // Simulation de succès ou d'erreur
            if (formData.email === "test@test.com") {
                setErrors({ general: "Cet email est déjà utilisé" });
            }
            else {
                console.log("Registration success!");
                // Redirection vers la page de connexion
                router.push("/login?registered=true");
            }
            setLoading(false);
        }, 1500);
    };
    return (<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <card_1.Card className="w-full max-w-md border-blue-100 shadow-lg">
        <card_1.CardHeader className="text-center">
          <card_1.CardTitle className="text-2xl font-bold text-black">
            Inscription
          </card_1.CardTitle>
          <card_1.CardDescription className="text-black">
            Créez votre compte
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (<alert_1.Alert variant="destructive" className="bg-red-50 border-red-200">
                <alert_1.AlertDescription className="text-black">
                  {errors.general}
                </alert_1.AlertDescription>
              </alert_1.Alert>)}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label_1.Label htmlFor="firstName" className="text-black font-medium">
                  Prénom
                </label_1.Label>
                <input_1.Input id="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="John" disabled={loading}/>
                {errors.firstName && (<p className="text-red-600 text-sm mt-1">
                    {errors.firstName}
                  </p>)}
              </div>

              <div className="space-y-2">
                <label_1.Label htmlFor="lastName" className="text-black font-medium">
                  Nom
                </label_1.Label>
                <input_1.Input id="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="Doe" disabled={loading}/>
                {errors.lastName && (<p className="text-red-600 text-sm mt-1">{errors.lastName}</p>)}
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="email" className="text-black font-medium">
                Email
              </label_1.Label>
              <input_1.Input id="email" type="email" value={formData.email} onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="john.doe@email.com" disabled={loading}/>
              {errors.email && (<p className="text-red-600 text-sm mt-1">{errors.email}</p>)}
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="password" className="text-black font-medium">
                Mot de passe
              </label_1.Label>
              <input_1.Input id="password" type="password" value={formData.password} onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="••••••••" disabled={loading}/>
              {errors.password && (<p className="text-red-600 text-sm mt-1">{errors.password}</p>)}
              <p className="text-xs text-black">Minimum 6 caractères</p>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="confirmPassword" className="text-black font-medium">
                Confirmer le mot de passe
              </label_1.Label>
              <input_1.Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500" placeholder="••••••••" disabled={loading}/>
              {errors.confirmPassword && (<p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>)}
            </div>

            <button_1.Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" disabled={loading}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button_1.Button>

            <div className="text-center pt-4">
              <p className="text-sm text-black">
                Déjà un compte ?{" "}
                <link_1.default href="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Se connecter
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
