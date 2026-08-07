# Étape 1: Installation des dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/  # 👈 AJOUT : Copie le dossier prisma
RUN npm ci --only=production --ignore-scripts  # 👈 AJOUT : --ignore-scripts pour éviter postinstall

# Étape 2: Build de l'application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma  # 👈 AJOUT
COPY . .
RUN npx prisma generate  # 👈 AJOUT : Génère Prisma client
RUN npm run build

# Étape 3: Image finale légère
FROM node:20-alpine AS runner
WORKDIR /app

# Création d'un utilisateur non-root
RUN addgroup -g 1001 nodejs && adduser -S nextjs -u 1001

# Copie des fichiers de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma  # 👈 AJOUT
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma  # 👈 AJOUT

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
