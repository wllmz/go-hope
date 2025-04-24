# Utiliser Node.js 20 Alpine pour une image plus légère
FROM node:20-alpine

# Définir l'environnement de production dès le début
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Créer un répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers de dépendances pour un meilleur caching
COPY package*.json ./

# Installer les dépendances de façon optimisée pour la production
# Utiliser 'install' au lieu de 'ci' puisqu'il n'y a pas de package-lock.json
RUN npm install --only=production --no-audit --no-fund

# Copier le reste du code source
COPY . .


# Optimisation supplémentaire: supprimer cache npm et fichiers inutiles
RUN npm cache clean --force && \
    rm -rf /tmp/* && \
    rm -rf /root/.npm

# Exposer le port 5000
EXPOSE 5000

# Utiliser un utilisateur non-root pour plus de sécurité
USER node

# Commande pour démarrer l'application
CMD ["node", "app.js"]