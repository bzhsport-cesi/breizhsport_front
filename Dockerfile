# Stage 1: Installation des dépendances uniquement
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false

# Stage 2: Construction de l'application
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Installation des dépendances PRODUCTION uniquement
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Stage final : Exécution en production optimisée
FROM node:22-alpine
WORKDIR /app

COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node package.json ./

EXPOSE 3000
USER node

CMD ["node_modules/.bin/next", "start"]