# Prello

Proyecto [Next.js](https://nextjs.org/) (estilo Trello) con Prisma y PostgreSQL.

## Cómo iniciar la aplicación desde cero

Si acabas de descargar o clonar el código, sigue estos pasos:

### 1. Requisitos previos

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **pnpm** ([pnpm.io](https://pnpm.io/)) — instalación: `npm install -g pnpm`
- **PostgreSQL** en ejecución (local o servicio en la nube)

### 2. Instalar dependencias

En la raíz del proyecto:

```bash
pnpm install
```

Con esto se instalan las dependencias y se ejecuta `prisma generate` automáticamente (postinstall).

### 3. Configurar la base de datos

Crea un archivo `.env` en la raíz del proyecto con las variables de PostgreSQL:

```env
POSTGRES_PRISMA_URL="postgresql://usuario:contraseña@host:5432/prello?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://usuario:contraseña@host:5432/prello"
```

Sustituye `usuario`, `contraseña`, `host` y el nombre de la base de datos (`prello`) por los de tu entorno. Si usas PostgreSQL local sin pooling, puedes usar la misma URL en ambas variables (sin `?pgbouncer=true`).

### 4. Crear y aplicar las migraciones

Crea la base de datos si no existe y aplica el esquema:

```bash
pnpm exec prisma migrate deploy
```

O, en desarrollo, para sincronizar el esquema sin migraciones:

```bash
pnpm exec prisma db push
```

### 5. Arrancar la aplicación

Servidor de desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Para producción (tras hacer build):

```bash
pnpm build
pnpm start
```

---

## Scripts disponibles

| Comando        | Descripción              |
|----------------|--------------------------|
| `pnpm dev`     | Servidor de desarrollo   |
| `pnpm build`   | Build de producción      |
| `pnpm start`   | Servidor de producción   |
| `pnpm lint`    | Ejecutar ESLint          |

## Más información

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
