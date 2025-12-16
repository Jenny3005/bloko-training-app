import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { z } from "zod";
const router = Router();
// GET /api/products - Liste tous les produits
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
});
// GET /api/products/:id - Récupère un produit spécifique
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
    });
  }
});

// GET /api/products/user/:userId - Produits d'un utilisateur
router.get('/user/:userId', async (req: Request, res: Response) => {
try {
const { userId } = req.params;
const products = await prisma.product.findMany({
where: {
userId,
},
orderBy: {
createdAt: 'desc',
},
});
res.json({
success: true,
data: products,
count: products.length,
});
} catch (error) {
console.error('Error fetching user products:', error);
res.status(500).json({
success: false,
error: 'Failed to fetch user products',
});
}
});

// POST /api/products - Créer un nouveau produit
router.post("/", async (req: Request, res: Response) => {
  try {
    // Valider les données
    const validatedData = createProductSchema.parse(req.body);
    // TODO: récupérer l'userId depuis le token d'auth (pour l'instant, hardcodé)
    // Pour tester, créer d'abord un utilisateur dans Supabase manuellement
    const userId = "d7d4b7fe-93fd-4fd4-b508-b05a28c3d776";
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create product",
    });
  }
});
// PUT /api/products/:id - Modifier un produit
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProductSchema.parse(req.body);
    // Vérifier que le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    // TODO: vérifier que c'est bien le propriétaire du produit
    const product = await prisma.product.update({
      where: { id },
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update product",
    });
  }
});
// DELETE /api/products/:id - Supprimer un produit
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Vérifier que le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    // TODO: vérifier que c'est bien le propriétaire du produit
    await prisma.product.delete({
      where: { id },
    });
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete product",
    });
  }
});
export default router;
