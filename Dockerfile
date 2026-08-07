# Étape 1: Dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Étape 2: Build (AJOUTEZ "AS builder" sur cette ligne)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Étape 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
# ... le reste du fichier
