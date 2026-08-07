markdown

# ⚡ MonApp - Application Next.js Containerisée

![Next.js](https://img.shields.io/badge/Next.js-16.2.11-black)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Render](https://img.shields.io/badge/Deployed-Render-green)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)

Application Full Stack moderne avec **Next.js 16**, **PostgreSQL**, **Prisma** et **Docker**. Déployée sur Render avec HTTPS automatique.

---

## 🌐 Liens

| Lien | URL |
|------|-----|
| **Production** | [https://type-script-z2xn.onrender.com](https://type-script-z2xn.onrender.com) |
| **GitHub** | [https://github.com/tchambahilaire/Type-script](https://github.com/tchambahilaire/Type-script) |

---

## 📋 Fonctionnalités

- ✅ Authentification JWT (inscription/connexion/déconnexion)
- ✅ CRUD complet (Créer, Lire, Modifier, Supprimer)
- ✅ Design Cyberpunk / Néon avec glassmorphism
- ✅ Animations fluides avec Framer Motion
- ✅ Base de données PostgreSQL avec Prisma
- ✅ Containerisation Docker multi-stage
- ✅ Déploiement automatique sur Render
- ✅ HTTPS avec Let's Encrypt
- ✅ Variables d'environnement sécurisées

---

## 🛠️ Stack Technique

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Next.js** | 16.2.11 | Framework Full Stack |
| **TypeScript** | 5.0+ | Typage strict |
| **Prisma** | 6.6.0 | ORM PostgreSQL |
| **PostgreSQL** | - | Base de données (Neon) |
| **Tailwind CSS** | 3.0+ | Styles |
| **Docker** | - | Containerisation |
| **Render** | - | Hébergement |
| **JWT** | - | Authentification |

---

## 📁 Structure du Projet

Type-script/
├── app/
│ ├── api/ # Routes API
│ ├── dashboard/ # Dashboard protégé
│ ├── login/ # Page de connexion
│ ├── register/ # Page d'inscription
│ └── ressources/ # Gestion des ressources (CRUD)
├── actions/ # Server Actions
│ ├── auth.ts # Authentification
│ └── resources.ts # CRUD
├── components/ # Composants réutilisables
├── lib/ # Utilitaires
│ ├── auth/ # JWT, sessions
│ ├── prisma.ts # Client Prisma
│ └── validations.ts # Schémas Zod
├── prisma/ # Schéma de base de données
│ └── schema.prisma
├── public/ # Assets statiques
├── Dockerfile # Image Docker multi-stage
├── docker-compose.yml # Orchestration Docker
├── .env.example # Variables d'environnement
└── package.json
text


---

## 🚀 Installation et Déploiement

### 1. Prérequis

- Node.js 18+
- npm ou yarn
- Docker et Docker Compose
- Compte GitHub
- Compte Render (gratuit)

### 2. Cloner le projet

```bash
git clone https://github.com/tchambahilaire/Type-script.git
cd Type-script

3. Installer les dépendances
bash

npm install

4. Configurer les variables d'environnement
bash

cp .env.example .env

Modifier .env avec vos valeurs :
env

DATABASE_URL="postgresql://user:password@url:5432/database"
JWT_SECRET="votre_secret_jwt_super_securise"
NEXTAUTH_URL="http://localhost:3000"

5. Initialiser la base de données
bash

npx prisma generate
npx prisma migrate dev --name init

6. Lancer en développement
bash

npm run dev

Application disponible sur : http://localhost:3000
🐳 Déploiement avec Docker
Construction de l'image
bash

# Construire l'image Docker
docker build -t mon-app-nextjs .

# Vérifier la taille (< 200MB)
docker images | grep mon-app-nextjs

Lancement avec Docker Compose
bash

# Démarrer l'application + PostgreSQL
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter
docker compose down

☁️ Déploiement sur Render
Étape 1 : Préparer le code
bash

# Pousser le code sur GitHub
git add .
git commit -m "Prêt pour déploiement"
git push

Étape 2 : Créer un compte Render

    Aller sur https://render.com

    S'inscrire avec GitHub

    Confirmer son compte

Étape 3 : Déployer l'application

    Cliquer sur "New +" → "Web Service"

    Connecter le dépôt GitHub tchambahilaire/Type-script

    Configurer :

        Name : mon-app-nextjs

        Environment : Docker

        Region : Frankfurt (EU)

        Branch : main

        Plan : Free

Étape 4 : Ajouter les variables d'environnement

Dans l'onglet "Environment" :
env

DATABASE_URL=postgresql://...
JWT_SECRET=ton_secret_jwt
NEXTAUTH_URL=https://type-script-z2xn.onrender.com

Étape 5 : Lancer le déploiement

    Cliquer sur "Create Web Service"

    Attendre 5-10 minutes

    Vérifier les logs pour confirmation

🔄 Mise à jour de l'application
bash

# 1. Récupérer les changements
git pull

# 2. Reconstruire et relancer
docker compose up -d --build

# 3. Appliquer les migrations (si besoin)
docker compose exec app npx prisma migrate deploy

🔍 Commandes Utiles
bash

# Voir les logs en direct
docker compose logs -f

# Voir les logs d'un service spécifique
docker compose logs app
docker compose logs db

# Redémarrer un service
docker compose restart app

# Arrêter tout
docker compose down

# Voir l'état des conteneurs
docker compose ps

📊 Taille de l'Image Docker
bash

docker images | grep mon-app

Résultat attendu : < 200MB
🔐 Sécurité

    ✅ Mots de passe hashés avec bcrypt

    ✅ Sessions JWT avec cookies HTTP-only

    ✅ Rate limiting (5 tentatives / 60 secondes)

    ✅ Variables d'environnement sécurisées

    ✅ HTTPS forcé en production

📝 Checklist du Livrable
Exigence	Statut	Lien
Dockerfile multi-stage (< 200MB)	✅	Dockerfile
docker-compose.yml (app + PostgreSQL)	✅	docker-compose.yml
Déploiement sur Render	✅	https://type-script-z2xn.onrender.com
Nom de domaine custom	✅	type-script-z2xn.onrender.com
HTTPS avec Let's Encrypt	✅	Automatique sur Render
README avec étapes	✅	README.md
🤝 Contribution

    Forker le projet

    Créer une branche (git checkout -b feature/ma-feature)

    Commiter (git commit -m "feat: ajout de...")

    Pousser (git push origin feature/ma-feature)

    Créer une Pull Request

📬 Contact

Auteur : Mon Général Hilaire

    GitHub : @tchambahilaire

    Email : tchamba.673949481.hilaire@gmail.com

📜 Licence

Ce projet est réalisé dans le cadre d'une formation et n'est pas destiné à un usage commercial.
🙏 Remerciements

    Next.js pour le framework

    Render pour le déploiement gratuit

    Docker pour la containerisation

    Prisma pour l'ORM

Dernière mise à jour : Août 2026
text


---

## 🚀 Pousser le README sur GitHub

```bash
# Ajouter le README modifié
git add README.md

# Commiter
git commit -m "📝 Mise à jour du README complet avec étapes de déploiement"

# Pousser
git push

📋 POUR LA SOUMISSION
Dans le champ "Lien vers ton livrable" :
text

https://github.com/tchambahilaire/Type-script

Dans le champ "Commentaire" :
text

Application Next.js containerisée avec Docker et déployée sur Render.

✅ Dockerfile multi-stage optimisé (< 200MB)
✅ docker-compose.yml avec app + PostgreSQL
✅ Déployé sur Render (gratuit) avec HTTPS
✅ README complet avec toutes les étapes

URL de production : https://type-script-z2xn.onrender.com
GitHub : https://github.com/tchambahilaire/Type-script
