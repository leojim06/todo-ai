# Arquitectura del Backend

## Enfoque
- **Vertical Slice Architecture** — cada módulo es autocontenido (rutas, controlador, servicio, repositorio)
- **Inyección simple de dependencias** — el controlador recibe el servicio, el servicio recibe el repositorio
- **Result Pattern** para manejo de respuestas exitosas y errores controlados
- **DTOs con Zod** — validación en el borde (controller) antes de llegar al servicio

## Estructura de Carpetas

```
backend/
├── prisma/                           # Configuración de Prisma (generador)
├── src/
│   ├── prisma/
│   │   ├── schema.prisma             # Modelos de base de datos
│   │   └── client.ts                 # Instancia singleton de PrismaClient
│   ├── main.ts                       # Punto de entrada (servidor HTTP)
│   ├── app.ts                        # Configuración Express (middlewares, router mount)
│   └── modules/
│       └── todos/
│           ├── todo.controller.ts    # Maneja request/response
│           ├── todo.service.ts       # Lógica de negocio
│           ├── todo.repository.ts    # Acceso a datos vía Prisma
│           ├── todo.schema.ts        # Validación de DTOs (Zod)
│           ├── todo.routes.ts        # Definición de rutas del slice
│           ├── todo.model.ts         # Tipos del dominio y Result pattern
│           ├── todo.errors.ts        # Errores específicos del módulo
│           └── index.ts              # Re-export del router
├── tests/
│   └── modules/
│       └── todos/
│           ├── todo.service.spec.ts
│           └── todo.controller.spec.ts
├── vitest.config.ts
├── tsconfig.json
├── tsconfig.build.json
└── package.json
```

## Result Pattern

```typescript
// src/modules/todos/todo.model.ts
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AppError }

// AppError (definido en shared)
export class AppError {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly httpStatus: number
  ) {}
}
```

**Flujo:**
1. **Controller** llama al **Service**
2. **Service** retorna `Result<T>` (éxito con `data` o error con `AppError`)
3. **Controller** según el resultado construye la respuesta HTTP:
   - `success: true` → `res.status(200|201).json({ success: true, data })`
   - `success: false` → `res.status(AppError.httpStatus).json({ success: false, error: { code, message } })`

## Endpoints REST

| Método | Ruta | Request | Response éxito |
|---|---|---|---|
| `GET` | `/api/todos` | — | `{ success: true, data: Todo[] }` |
| `GET` | `/api/todos/:id` | — | `{ success: true, data: Todo }` |
| `POST` | `/api/todos` | `{ title: string }` | `{ success: true, data: Todo }` |
| `PUT` | `/api/todos/:id` | `{ title?: string, completed?: boolean }` | `{ success: true, data: Todo }` |
| `DELETE` | `/api/todos/:id` | — | `{ success: true, data: null }` |

- Sin paginación — `GET /api/todos` devuelve el arreglo completo.

## Modelo Prisma (Todo)

| Campo | Tipo |
|---|---|
| id | String (UUID) |
| title | String |
| completed | Boolean (default false) |
| createdAt | DateTime |
| updatedAt | DateTime |

## Testing

- **Ubicación:** `tests/modules/todos/` (fuera de `src/`)
- **Framework:** Vitest
- **Enfoque:** TDD
- Se testean **service** (lógica de negocio) y **controller** (integración request/response)
