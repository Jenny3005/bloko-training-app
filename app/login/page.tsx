"use client";

import { useState } from "react";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else {
        setError("Email ou mot de passe incorrect");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md border-blue-100 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            Connexion
          </CardTitle>
          <CardDescription className="text-black">
            Connectez-vous à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-black">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                placeholder="votre@email.com"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-gray-500"
                placeholder="motdepasse"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-black">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  S'inscrire
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
