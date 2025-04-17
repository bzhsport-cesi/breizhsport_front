# Stage 1: Installation des dépendances uniquement
FROM node:23-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false

# Stage 2: Construction de l'application
FROM node:23-alpine AS builder
WORKDIR /app

# Define build arguments
ARG PORT=3000
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STRAPI_URL
ARG AUTH_SECRET

# Set environment variables from build arguments
ENV PORT=${PORT}
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV NODE_ENV=production

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Installation des dépendances PRODUCTION uniquement
FROM node:23-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Stage final : Exécution en production optimisée
FROM node:23-alpine
WORKDIR /app

# Get the build arguments again for runtime
ARG PORT=3000
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STRAPI_URL
ARG AUTH_SECRET

# Set environment variables for runtime
ENV PORT=${PORT}
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV AUTH_SECRET=${AUTH_SECRET}

COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node package.json ./

EXPOSE ${PORT}
USER node

CMD ["node_modules/.bin/next", "start"]