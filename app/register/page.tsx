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
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
    }

    // Validation du nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
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
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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
    setErrors({});
    setSuccess("");

    try {
      // ✅ CORRECTION ICI : URL absolue vers le serveur backend Express
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Inscription réussie ! Redirection...");
        
        // Sauvegarder le token et les données utilisateur
        if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        
        // Attendre 2 secondes puis rediriger
        setTimeout(() => {
          router.push("/login?registered=true");
        }, 2000);
      } else {
        // Gérer les erreurs du backend
        if (data.error === "Un utilisateur avec cet email existe déjà") {
          setErrors({ general: "Cet email est déjà utilisé. Essayez de vous connecter." });
        } else if (data.errors) {
          // Erreurs de validation Zod
          const validationErrors: Record<string, string> = {};
          data.errors.forEach((error: any) => {
            if (error.path && error.path.includes('firstName')) validationErrors.firstName = error.message;
            else if (error.path && error.path.includes('lastName')) validationErrors.lastName = error.message;
            else if (error.path && error.path.includes('email')) validationErrors.email = error.message;
            else if (error.path && error.path.includes('password')) validationErrors.password = error.message;
          });
          setErrors(validationErrors);
        } else {
          setErrors({ general: data.error || "Une erreur est survenue lors de l'inscription" });
        }
      }
    } catch (err: any) {
      console.error("Erreur réseau:", err);
      
      // Vérifier si c'est une erreur de parsing JSON (HTML reçu au lieu de JSON)
      if (err instanceof SyntaxError) {
        setErrors({ general: "Le serveur a retourné une réponse invalide. Vérifiez que le serveur backend est en marche sur le port 3001." });
      } else {
        setErrors({ general: "Erreur de connexion au serveur. Vérifiez votre connexion internet." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md border-blue-100 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-gray-600">
            Rejoignez notre communauté
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium">
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Doe"
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="john.doe@email.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Mot de passe *
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500">Minimum 6 caractères</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirmer le mot de passe *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
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
                className="inline-block mt-2 text-sm text-gray-600 hover:text-gray-800 hover:underline"
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