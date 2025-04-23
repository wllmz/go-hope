# syntax=docker/dockerfile:1.6
FROM node:20-alpine

ENV NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=512

WORKDIR /app

# 1. On ne copie que les manifests : meilleure mise en cache
COPY package*.json ./

RUN npm ci --production --no-audit --no-fund \
 && npm cache clean --force \
 && rm -rf /root/.npm

# 2. Code source
COPY . .

# 3. Dossier uploads (et droits pour l’utilisateur non-root)
RUN mkdir -p uploads && chown -R node:node /app

USER node
EXPOSE 5000
CMD ["node", "app.js"]
