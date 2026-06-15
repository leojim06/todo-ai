# Stack Tecnológico

## Gestor de Paquetes
- **npm**

## Estructura del Proyecto
- **Monorepo** con npm workspaces
  - `frontend/` — Aplicación React
  - `backend/` — API Express

## Frontend
| Capa | Tecnología |
|---|---|
| Framework | React |
| Bundler | Vite |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |

## Backend
| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Lenguaje | TypeScript |
| ORM | Prisma |
| Base de datos inicial | SQLite |
| Base de datos futura | PostgreSQL (cambio de provider en Prisma) |

## API
- **Estilo:** REST
- **Recursos:** CRUD de TODOs

## Testing
- **Framework:** Vitest
- **Enfoque:** TDD (Test Driven Development)

## Autenticación
- Sin login (app de un solo usuario)

## Scripts

### Backend
| Comando | Descripción |
|---|---|
| `npm run dev:backend` | Inicia el servidor Express en modo desarrollo (nodemon + ts-node) |
| `npm run build:backend` | Compila TypeScript a JavaScript |
| `npm run test:backend` | Ejecuta los tests del backend con Vitest |

### Frontend
| Comando | Descripción |
|---|---|
| `npm run dev:frontend` | Inicia Vite dev server |
| `npm run build:frontend` | Compila el frontend con Vite |
| `npm run test:frontend` | Ejecuta los tests del frontend con Vitest |

### Raíz (monorepo)
| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia frontend y backend en paralelo |
| `npm run build` | Compila ambos proyectos |
| `npm run test` | Ejecuta tests en ambos proyectos |
