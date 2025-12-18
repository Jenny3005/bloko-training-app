"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
// GET /api/stats - Statistiques globales
router.get("/", async (req, res) => {
    try {
        const totalProducts = await prisma_1.prisma.product.count();
        const totalUsers = await prisma_1.prisma.user.count();
        const avgPrice = await prisma_1.prisma.product.aggregate({
            _avg: {
                price: true,
            },
        });
        const mostExpensive = await prisma_1.prisma.product.findFirst({
            orderBy: {
                price: "desc",
            },
        });
        const cheapest = await prisma_1.prisma.product.findFirst({
            orderBy: {
                price: "asc",
            },
        });
        res.json({
            success: true,
            data: {
                totalProducts,
                totalUsers,
                averagePrice: avgPrice._avg.price || 0,
                mostExpensive,
                cheapest,
            },
        });
    }
    catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch statistics",
        });
    }
});
exports.default = router;
