import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          <span className="block">Gérez Vos Produits</span>
          <span className="text-blue-600">Avec Facilité</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-gray-600 mt-4 mb-8 max-w-3xl mx-auto">
          Bloko Training est la plateforme ultime pour gérer vos produits,
          suivre vos stocks et optimiser votre inventaire en temps réel.
        </p>

        {/* Container de boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-12">
          {/* Bouton Connexion */}
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg
                                 hover:bg-blue-700 transition-colors duration-300 
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                                 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Se connecter
          </Link>

          {/* Bouton Inscription */}
          <Link
            href="/register"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg 
                                 font-semibold text-lg hover:bg-blue-50 transition-colors duration-300
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                                 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            S'inscrire gratuitement
          </Link>
        </div>

        {/* Témoignage ou section supplémentaire (sans la directrice) */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 italic mb-4">
            "Bloko Training a transformé la gestion de notre inventaire. Simple,
            efficace et puissant !"
          </p>
        </div>

        {/* Call to action final */}
        <div className="mt-12">
          <p className="text-gray-600">
            Déjà plus de 1 000 entreprises nous font confiance.
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-semibold ml-2"
            >
              Voir le tableau de bord →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
