import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loggerMiddleware } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { prisma } from "./lib/prisma";
import path from "path";

import productRoutes from "./routes/products";
import statsRoutes from "./routes/stats";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../app/page.tsx"));
});
app.use("/api/stats", statsRoutes);
// Routes API
app.use("/api/products", productRoutes);

// Test de connexion à la base de données
app.get("/api/test-db", async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ success: true, userCount: count });
  } catch (error) {
    console.error("Database error:", error);

    // ✅ Correction TypeScript pour 'unknown'
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: "Database connection failed",
        details: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Database connection failed",
        details: "Unknown error occurred",
      });
    }
  }
});

// ✅ Ajoutez cette route pour tester Supabase
app.get("/test-supabase", async (req: Request, res: Response) => {
  try {
    // Test simple de connexion
    await prisma.$queryRaw`SELECT 1 as connection_test`;
    res.json({
      success: true,
      message: "✅ Connexion Supabase réussie!",
    });
  } catch (error) {
    console.error("Supabase error:", error);

    // ✅ Correction TypeScript pour 'unknown'
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: "❌ Échec de connexion à Supabase",
        details: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "❌ Échec de connexion à Supabase",
        details: "Unknown error occurred",
      });
    }
  }
});
// Middleware de gestion d'erreurs (DOIT être en dernier)
app.use(errorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
 🚀
 Server running on http://localhost:${PORT}`);
});

app.use("/api/products", productRoutes);

// Ajouter cette route de test
app.get("/api/test-db", async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ success: true, userCount: count });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});
