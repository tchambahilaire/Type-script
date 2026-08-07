# Dernière étape : le "runner"
FROM node:20-alpine AS runner
WORKDIR /app

# ... (les autres lignes de copie de fichiers) ...

# 👇 AJOUTE CES 3 LIGNES ICI 👇
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
