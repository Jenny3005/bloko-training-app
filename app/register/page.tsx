"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else {
        console.log("Registration success!");
        // Redirection vers la page de connexion
        router.push("/login?registered=true");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md border-blue-100 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            Inscription
          </CardTitle>
          <CardDescription className="text-black">
            Créez votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-black">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-black font-medium">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                  placeholder="John"
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-black font-medium">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                  placeholder="Doe"
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                placeholder="john.doe@email.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-black">Minimum 6 caractères</p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-black font-medium"
              >
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-black">
                Déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Se connecter
                </Link>
              </p>
              <Link
                href="/"
                className="inline-block mt-2 text-sm text-black hover:text-gray-800 hover:underline"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
