import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
const router = Router();
// GET /api/stats - Statistiques globales
router.get("/", async (req: Request, res: Response) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalUsers = await prisma.user.count();
    const avgPrice = await prisma.product.aggregate({
      _avg: {
        price: true,
      },
    });
    const mostExpensive = await prisma.product.findFirst({
      orderBy: {
        price: "desc",
      },
    });
    const cheapest = await prisma.product.findFirst({
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
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});
export default router;
