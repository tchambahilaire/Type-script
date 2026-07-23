<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=for-the-badge" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.0-2D3748?logo=prisma&style=for-the-badge" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css&style=for-the-badge" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Neon-PostgreSQL-00E8FF?logo=postgresql&style=for-the-badge" alt="Neon" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&style=for-the-badge" alt="Vercel" />
</div>

<br/>

<div align="center">
  <h1>⚡ MonApp</h1>
  <p><strong>Application Full Stack Next.js 16 · Design Cyberpunk / Néon</strong></p>
  <p>
    <a href="https://mon-app-final.vercel.app">🌐 Voir en ligne</a> ·
    <a href="https://github.com/tchambahilaire/mon-app-final">📁 Code source</a>
  </p>
</div>

---

## 📋 Description

**MonApp** est une application Full Stack moderne développée avec **Next.js 16**, **Prisma**, **PostgreSQL (Neon)** et une authentification **JWT personnalisée**.

L'interface adopte un design **cyberpunk / néon** avec des effets de lueur, du glassmorphism et des animations fluides.

---

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription / Connexion / Déconnexion
- Mots de passe hashés avec bcrypt
- Sessions JWT avec cookies HTTP-only
- Rate limiting (5 tentatives / 60 secondes)

### 📝 Gestion des ressources (CRUD)
- ✅ Créer (`POST`)
- ✅ Lire (liste) (`GET`)
- ✅ Lire (détail) (`GET`)
- ✅ Modifier (`PUT`)
- ✅ Supprimer (`DELETE`)

### 🎨 Interface
- Design cyberpunk / néon
- Glassmorphism
- Animations fluides
- Responsive (mobile-first)
- Pagination, recherche, filtres
- Export CSV

---

## 🛠️ Stack Technique

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Next.js** | 16.2.11 | Framework Full Stack |
| **TypeScript** | 5.0+ | Typage strict |
| **Prisma** | 6.6.0 | ORM PostgreSQL |
| **Neon** | - | PostgreSQL serverless |
| **Tailwind CSS** | 3.0+ | Styles |
| **Zod** | - | Validation |
| **bcryptjs** | - | Hashage |
| **JWT** | - | Authentification |
| **Framer Motion** | 11.0+ | Animations |

---

## 📁 Structure du projet

mon-app-final/
├── app/
│ ├── api/ # Routes API
│ ├── dashboard/ # Dashboard (protégé)
│ ├── login/ # Connexion
│ ├── register/ # Inscription
│ └── ressources/ # CRUD
│ ├── page.tsx # Liste
│ ├── nouveau/ # Création
│ └── [id]/ # Détail + Édition
├── actions/ # Server Actions
│ ├── auth.ts # Authentification
│ └── resources.ts # CRUD
├── lib/ # Utilitaires
│ ├── auth/ # JWT, sessions
│ ├── prisma.ts # Client Prisma
│ ├── validations.ts # Schémas Zod
│ └── rate-limit.ts # Rate limiting
├── components/ # UI réutilisable
├── prisma/ # Schéma DB
├── public/ # Assets
├── .env.example # Variables d'environnement
├── package.json
└── README.md # Ce fichier
text


---

## 🚀 Installation

### 1. Prérequis

- Node.js 18+
- npm ou yarn
- Compte [Neon](https://neon.tech)

### 2. Cloner le projet

```bash
git clone https://github.com/tchambahilaire/mon-app-final.git
cd mon-app-final

3. Installer les dépendances
bash

npm install

4. Configurer les variables d'environnement
bash

cp .env.example .env

env

DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
JWT_SECRET="votre_secret_super_securise"

5. Initialiser la base de données
bash

npx prisma generate
npx prisma migrate dev --name init

6. Lancer l'application
bash

npm run dev

L'application sera disponible sur http://localhost:3000
📡 API / Server Actions
Authentification
Action	Fonction	Description
Inscription	register(formData)	Crée un compte
Connexion	login(formData)	Authentifie et crée un cookie JWT
Déconnexion	logout()	Supprime le cookie
Ressources (CRUD)
Action	Fonction	Description
Créer	createResource(formData)	Crée une ressource
Lister	getResources()	Récupère les ressources
Détail	getResource(id)	Récupère une ressource
Modifier	updateResource(id, formData)	Modifie une ressource
Supprimer	deleteResource(id)	Supprime une ressource
🔧 Variables d'environnement
Variable	Description
DATABASE_URL	URL de connexion PostgreSQL (Neon)
JWT_SECRET	Secret pour signer les JWT
📦 Déploiement
Vercel

    Pousser le code sur GitHub

    Aller sur Vercel

    Importer le dépôt

    Ajouter les variables d'environnement

    Déployer

Neon

    Créer un compte sur Neon

    Créer un projet PostgreSQL

    Copier l'URL de connexion

    Ajouter DATABASE_URL

✅ Checklist
Exigence	Statut
Next.js 16+ App Router	✅
TypeScript strict	✅
Prisma + PostgreSQL	✅
Tailwind CSS	✅
Page statique (SSG)	✅
Page dynamique	✅
Page protégée	✅
Auth JWT	✅
CRUD complet	✅
Déploiement Vercel	✅
Base Neon	✅
Rate limiting	✅
Pagination	✅
Recherche	✅
Mode sombre/clair	✅
Notifications	✅
Export CSV	✅
Animations	✅
Glassmorphism	✅
🤝 Contribution

    Forker le projet

    Créer une branche (git checkout -b feature/ma-feature)

    Commiter (git commit -m "feat: ajout de...")

    Pousser (git push origin feature/ma-feature)

    Créer une Pull Request

📝 Licence

Ce projet est réalisé dans le cadre d'une formation et n'est pas destiné à un usage commercial.
👨‍💻 Auteur

Mon Général Hilaire

    GitHub : @tchambahilaire

    Email : tchamba.673949481.hilaire@gmail.com

