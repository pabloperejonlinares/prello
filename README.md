# Prello

Trello-style project built with Next.js: boards, columns, and tasks with drag & drop.

## Technologies

| Area | Technology |
|------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router) |
| **UI** | [React](https://react.dev/) 19 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/) (ORM) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4, [Sass](https://sass-lang.com/), [HeroUI](https://www.heroui.com/) (NextUI) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Drag & drop** | [@atlaskit/pragmatic-drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/about) |
| **Testing** | [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/react) |
| **Linting** | ESLint + eslint-config-next |
| **Git hooks** | [Husky](https://typicode.github.io/husky/) |
| **Deploy** | [Vercel](https://vercel.com/) |

---

## How to run the app locally

### 1. Prerequisites

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **pnpm** ([pnpm.io](https://pnpm.io/)) — install: `npm install -g pnpm`
- **PostgreSQL** running (local or cloud)

### 2. Clone and install dependencies

From the project root:

```bash
pnpm install
```

This installs dependencies and runs `prisma generate` automatically (via the `postinstall` script).

### 3. Configure the database

Create a `.env` file in the project root with your PostgreSQL variables:

```env
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/prello?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/prello"
```

Replace `user`, `password`, `host`, and the database name (`prello`) with your own values.

- For local PostgreSQL without pooling, you can use the same URL for both variables (without `?pgbouncer=true`).
- Create the database if it doesn’t exist, e.g.: `createdb prello`.

### 4. Apply the database schema

To run migrations (recommended for production):

```bash
pnpm exec prisma migrate deploy
```

For development, to sync the schema without migrations:

```bash
pnpm exec prisma db push
```

### 5. Start the app

Development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For production (after building):

```bash
pnpm build
pnpm start
```

---

## Available scripts

| Command       | Description              |
|---------------|--------------------------|
| `pnpm dev`    | Development server       |
| `pnpm build`  | Production build         |
| `pnpm start`  | Production server        |
| `pnpm lint`   | Run ESLint               |
| `pnpm test`   | Run tests with Jest      |

---

## Further reading

- [Next.js documentation](https://nextjs.org/docs)
- [Prisma documentation](https://www.prisma.io/docs)
- [HeroUI documentation](https://www.heroui.com/docs)
