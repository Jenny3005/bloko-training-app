// server.js - Version corrigée pour Prisma 6
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient(); // Simple et efficace avec Prisma 6
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Route de test de connexion
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: '✅ OK',
      database: 'Supabase PostgreSQL (via Prisma 6)',
      connected: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erreur DB:', error.message);
    res.status(500).json({
      status: '❌ Erreur',
      error: 'Impossible de se connecter à la base de données'
    });
  }
});

// Route d'inscription (ton code principal)
app.post('/api/register', async (req, res) => {
  console.log('📨 Inscription reçue:', req.body);
  
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }
    
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: email,
        passwordHash: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    
    console.log(`✅ Utilisateur créé dans Supabase: ${user.email}`);
    
    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'supabase-secret-123',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: '🎉 Inscription réussie !',
      data: {
        user,
        token
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur inscription:', error);
    
    // Gestion des erreurs Prisma
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'Cet email est déjà utilisé'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de l\'inscription'
    });
  }
});

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
// Après l'initialisation de Prisma, avant app.listen()
async function testDatabaseConnection() {
  try {
    console.log('🔍 Test de connexion à Supabase...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connexion à Supabase réussie!');
    
    // Vérifie si la table 'users' existe
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `;
    console.log('📊 Table users existe?', tableExists[0].exists);
    
  } catch (error) {
    console.error('❌ ERREUR de connexion DB:', error.message);
    console.error('💡 Vérifie:');
    console.error('   1. DATABASE_URL dans .env');
    console.error('   2. Si Supabase est actif (pas en pause)');
    console.error('   3. Si le mot de passe est correct');
  }
}

// Appelle la fonction test avant de démarrer
testDatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
  });
});
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur backend Prisma 6 démarré sur http://localhost:${PORT}`);
  console.log(`📡 Connexion à: ${process.env.DATABASE_URL?.split('@')[1] || 'Supabase'}`);
  console.log(`🩺 Test santé: curl http://localhost:${PORT}/api/health`);
});