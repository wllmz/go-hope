# Étape 1 : Construction de l'application React avec Vite
FROM node:18 AS builder

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build  

# Étape 2 : Utiliser un serveur Node.js pour servir les fichiers construits
FROM node:18-slim

WORKDIR /app

# Installer le serveur pour servir les fichiers de manière statique
RUN npm install -g serve

# Copier le dossier 'dist' depuis l'étape précédente
COPY --from=builder /app/dist /app/dist  

# Copier le fichier de configuration serve.json
COPY serve.json /app/dist/serve.json

# Exposer le port 80
EXPOSE 80

# Lancer le serveur pour servir les fichiers statiques
CMD ["serve", "-s", "dist", "-l", "80"]