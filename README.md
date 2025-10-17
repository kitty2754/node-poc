# NestJS API Starter with JWT Auth

A production-ready NestJS starter application demonstrating REST API development with TypeScript. This project includes authentication, authorization, and basic CRUD operations.

## Features

- 🔐 JWT Authentication
- 👥 Role-based Authorization
- 📝 Tasks CRUD API
- 🗄️ PostgreSQL with Prisma ORM
- ✨ Clean Architecture & DI

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd node-poc
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

### Create a task (requires authentication)
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete project"}'
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests

## Project Structure

```
src/
├── auth/           # Authentication & authorization
├── tasks/          # Tasks module (CRUD example)
├── users/          # User management
├── prisma/         # Database layer
└── app.module.ts   # Main application module
```

## License

MIT