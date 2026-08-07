# ... les premières étapes (deps, builder) restent identiques ...

# Étape 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 nodejs && adduser -S nextjs -u 1001

# On copie tout le contenu du dossier standalone, quel que soit son contenu
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# On s'assure que les dossiers static et public sont bien là
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# On démarre le serveur de manière plus robuste
CMD ["node", "server.js"]
