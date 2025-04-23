# ---------- builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci --no-audit --no-fund     # installe *tout* (prod + dev)
    
    COPY . .
    
    # Ici tu pourrais lancer des tests lint, etc.
    # RUN npm test
    
    # ---------- runtime ----------
    FROM node:20-slim AS runtime
    WORKDIR /app
    ENV NODE_ENV=production \
        NODE_OPTIONS=--max-old-space-size=512
    
    # Copie juste les manifests et installe les deps prod
    COPY package*.json ./
    RUN npm ci --production --no-audit --no-fund \
     && npm cache clean --force
    
    # Copie le code *sans* les node_modules dev-deps
    COPY --from=builder --chown=node:node /app ./
    
    USER node
    EXPOSE 5000
    CMD ["node", "app.js"]
    