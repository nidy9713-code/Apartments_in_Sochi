FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/admin/package*.json ./apps/admin/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY apps/admin ./apps/admin
COPY packages/database ./packages/database
COPY packages/shared ./packages/shared

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npm run build -w apps/admin

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/admin/package*.json ./apps/admin/
COPY --from=builder /app/apps/admin/.next ./apps/admin/.next
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "apps/admin"]
