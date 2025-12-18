"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = require("./middlewares/errorHandler");
const prisma_1 = require("./lib/prisma");
const path_1 = __importDefault(require("path"));
const products_1 = __importDefault(require("./routes/products"));
const stats_1 = __importDefault(require("./routes/stats"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.loggerMiddleware);
// Route de test
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../app/page.tsx"));
});
app.use("/api/stats", stats_1.default);
// Routes API
app.use("/api/products", products_1.default);
// Test de connexion à la base de données
app.get("/api/test-db", async (req, res) => {
    try {
        const count = await prisma_1.prisma.user.count();
        res.json({ success: true, userCount: count });
    }
    catch (error) {
        console.error("Database error:", error);
        // ✅ Correction TypeScript pour 'unknown'
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: "Database connection failed",
                details: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: "Database connection failed",
                details: "Unknown error occurred",
            });
        }
    }
});
// ✅ Ajoutez cette route pour tester Supabase
app.get("/test-supabase", async (req, res) => {
    try {
        // Test simple de connexion
        await prisma_1.prisma.$queryRaw `SELECT 1 as connection_test`;
        res.json({
            success: true,
            message: "✅ Connexion Supabase réussie!",
        });
    }
    catch (error) {
        console.error("Supabase error:", error);
        // ✅ Correction TypeScript pour 'unknown'
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: "❌ Échec de connexion à Supabase",
                details: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: "❌ Échec de connexion à Supabase",
                details: "Unknown error occurred",
            });
        }
    }
});
// Middleware de gestion d'erreurs (DOIT être en dernier)
app.use(errorHandler_1.errorHandler);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`
 🚀
 Server running on http://localhost:${PORT}`);
});
app.use("/api/products", products_1.default);
// Ajouter cette route de test
app.get("/api/test-db", async (req, res) => {
    try {
        const count = await prisma_1.prisma.user.count();
        res.json({ success: true, userCount: count });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Database connection failed" });
    }
});
