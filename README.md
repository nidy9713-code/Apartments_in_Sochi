# Sochi Apartments Booking System

Production-ready Telegram bot and Admin panel for apartment booking in Sochi.

## Tech Stack
- **Bot**: Node.js, TypeScript, Telegraf
- **Admin**: Next.js 14, Tailwind CSS
- **Database**: Supabase (PostgreSQL), Prisma ORM
- **Infrastructure**: Docker, Docker Compose

## Project Structure
- `/apps/bot`: Telegram bot implementation
- `/apps/admin`: Next.js admin dashboard
- `/packages/database`: Prisma schema and database client
- `/packages/shared`: Common types and utilities

## Local Setup

1. **Environment Variables**:
   Copy `.env.example` to `.env` in the root and in `apps/bot/.env`, `apps/admin/.env`.

2. **Database**:
   ```bash
   docker-compose up -d db
   cd packages/database
   npx prisma migrate dev
   ```

3. **Run Bot**:
   ```bash
   cd apps/bot
   npm install
   npm run dev
   ```

4. **Run Admin**:
   ```bash
   cd apps/admin
   npm install
   npm run dev
   ```

## Docker Deployment
```bash
docker-compose up --build
```

## Deployment to Amvera/Railway

1. Create a new project on Amvera.
2. Connect your repository.
3. Add environment variables:
   - `BOT_TOKEN`
   - `DATABASE_URL`
   - `MANAGER_TELEGRAM`
   - `MANAGER_PHONE`
4. Use the provided `amvera.yml` (if needed) or Dockerfile.

## Features
- ✅ Apartment list with photos and descriptions
- ✅ Availability check via HomeReserve links
- ✅ FAQ section (managed via Admin Panel)
- ✅ Booking request flow
- ✅ Admin dashboard for CRUD operations
