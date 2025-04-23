# ---------- builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # 1) Manifests
    COPY package*.json ./
    RUN npm install --no-audit --no-fund          # installe prod + dev
    
    # 2) Code source
    COPY . .
    
    # (facultatif) tests, linters, etc.
    # RUN npm test
    
    
    
    # ---------- runtime ----------
    FROM node:20-slim AS runtime
    WORKDIR /app
    ENV NODE_ENV=production \
        NODE_OPTIONS=--max-old-space-size=512
    
    # 1) Manifests + deps prod seulement
    COPY package*.json ./
    RUN npm install --production --no-audit --no-fund \
     && npm cache clean --force                 # nettoie le cache npm
    
    # 2) Code sans node_modules dev-deps
    COPY --from=builder --chown=node:node /app .
    
    USER node
    EXPOSE 5000
    CMD ["node", "app.js"]
    