FROM node:18-slim AS builder

WORKDIR /app

# Install openssl and other dependencies needed for Prisma
RUN apt-get update && apt-get install -y openssl python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig.json ./
COPY apps/bot/package*.json ./apps/bot/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY apps/bot ./apps/bot
COPY packages/database ./packages/database
COPY packages/shared ./packages/shared

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npm run build -w apps/bot

FROM node:18-slim

WORKDIR /app

# Install openssl in the runtime image
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/bot/package*.json ./apps/bot/
COPY --from=builder /app/apps/bot/dist ./apps/bot/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "run", "start", "-w", "apps/bot"]
