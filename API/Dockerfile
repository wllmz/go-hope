# syntax=docker/dockerfile:1.6
FROM node:20-alpine

ENV NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=512

WORKDIR /app

# 1. Manifests (cache Docker sur package*.json)
COPY package*.json ./

RUN npm install --production --no-audit --no-fund \
 && npm cache clean --force \
 && rm -rf /root/.npm                   # nettoie le cache npm

# 2. Code source
COPY . .

# 3. Dossier uploads + droits
RUN mkdir -p uploads && chown -R node:node /app

USER node
EXPOSE 5000
CMD ["node", "app.js"]
