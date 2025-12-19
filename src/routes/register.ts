import { Router, Request, Response } from "express";
import { prisma } from "@/src/lib/prisma";
import { registerUserSchema, loginUserSchema } from "@/src/validators/user.validator";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// POST /api/register - Inscription d'un nouvel utilisateur
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Valider les données du formulaire
    const validatedData = registerUserSchema.parse(req.body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Un utilisateur avec cet email existe déjà",
      });
    }

    // Hasher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

    // Concaténer firstName et lastName pour le champ name
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`;

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: validatedData.email,
        passwordHash: hashedPassword,
      },
      // Ne pas retourner le mot de passe
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "votre_secret_jwt",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Inscription réussie",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      error: "Échec de l'inscription",
    });
  }
});

// POST /api/login - Connexion d'un utilisateur
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Valider les données
    const validatedData = loginUserSchema.parse(req.body);

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Email ou mot de passe incorrect",
      });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "votre_secret_jwt",
      { expiresIn: "24h" }
    );

    // Retourner les données utilisateur (sans mot de passe)
    const { passwordHash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Connexion réussie",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      error: "Échec de la connexion",
    });
  }
});

// GET /api/me - Récupérer le profil de l'utilisateur connecté
router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié",
      });
    }

    // Décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "votre_secret_jwt") as any;
    
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      error: "Échec de la récupération du profil",
    });
  }
});

export default router;