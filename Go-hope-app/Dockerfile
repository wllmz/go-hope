# Étape 1 : Construction avec Node 20 pour compatibilité react-router
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json et package-lock.json pour un meilleur caching
COPY package*.json ./

# Installation optimisée des dépendances
RUN npm ci --no-audit --no-fund --prefer-offline

# Copier les fichiers source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Image légère pour l'exécution
FROM node:20-alpine

WORKDIR /app

# Installer serve de façon optimisée
RUN npm install -g serve --no-audit --no-fund

# Copier uniquement les fichiers de build
COPY --from=builder /app/dist /app/dist

# Ajouter configuration pour SPA directement (sans besoin de serve.json séparé)
RUN echo '{"rewrites":[{"source":"/**","destination":"/index.html"}],"trailingSlash":false}' > /app/dist/serve.json

# Exposer le port 80
EXPOSE 80

# Lancer le serveur avec le mode --single pour SPA
CMD ["serve", "-s", "dist", "-l", "80", "--single"]