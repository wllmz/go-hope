# Étape 1: Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --no-audit --no-fund

# Copier les fichiers sources
COPY . .

# Builder l'application
RUN npm run build

# Étape 2: Servir l'application
FROM node:20-alpine

WORKDIR /app

# Installer serve
RUN npm install -g serve --no-audit --no-fund

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/dist /app/dist

# Configuration pour les SPA
RUN echo '{"rewrites":[{"source":"/**","destination":"/index.html"}],"trailingSlash":false}' > /app/dist/serve.json

# Exposer le port 80
EXPOSE 80

# Démarrer serve
CMD ["serve", "-s", "dist", "-l", "80", "--single"]