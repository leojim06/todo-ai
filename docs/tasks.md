# Lista de Tareas por Funcionalidad

## Backend

### Configuración Inicial
- [x] BE-01 Inicializar proyecto Node.js con TypeScript
- [x] BE-02 Configurar Prisma con SQLite (schema Todo)
- [x] BE-03 Crear cliente singleton de Prisma
- [x] BE-04 Configurar Express con middlewares base (CORS, JSON parser)
- [x] BE-05 Configurar Vitest para correr tests
- [x] BE-06 Configurar scripts en package.json (dev, build, test)

### Módulo TODOs — Infraestructura
- [ ] BE-07 Implementar shared/errors.ts (AppError class con code, message, httpStatus)
- [ ] BE-08 Implementar shared/types.ts (Result<T>, tipos helpers)
- [ ] BE-09 Implementar middleware global de errores (error.handler.ts)

### Módulo TODOs — Repository
- [ ] BE-10 Implementar findAll en todo.repository.ts
- [ ] BE-11 Implementar findById en todo.repository.ts
- [ ] BE-12 Implementar create en todo.repository.ts
- [ ] BE-13 Implementar update en todo.repository.ts
- [ ] BE-14 Implementar delete en todo.repository.ts

### Módulo TODOs — Service
- [ ] BE-15 Implementar listar todos (todo.service.ts → getAll)
- [ ] BE-16 Implementar obtener todo por ID (todo.service.ts → getById)
- [ ] BE-17 Implementar crear todo (todo.service.ts → create)
- [ ] BE-18 Implementar actualizar todo (todo.service.ts → update)
- [ ] BE-19 Implementar eliminar todo (todo.service.ts → remove)
- [ ] BE-20 Implementar toggle completado (todo.service.ts → toggle)

### Módulo TODOs — Schema y Validación
- [ ] BE-21 Crear schema Zod para creación (title: string, min 1, max 200)
- [ ] BE-22 Crear schema Zod para actualización (title y completed opcionales)

### Módulo TODOs — Controller
- [ ] BE-23 Implementar getAll en todo.controller.ts
- [ ] BE-24 Implementar getById en todo.controller.ts
- [ ] BE-25 Implementar create en todo.controller.ts
- [ ] BE-26 Implementar update en todo.controller.ts
- [ ] BE-27 Implementar remove en todo.controller.ts

### Módulo TODOs — Routes
- [ ] BE-28 Definir y montar rutas REST en todo.routes.ts
- [ ] BE-29 Montar router en app.ts bajo /api/todos

### Tests (TDD)
- [ ] BE-30 Test: todo.service — listar todos vacío
- [ ] BE-31 Test: todo.service — crear todo
- [ ] BE-32 Test: todo.service — obtener por ID existente
- [ ] BE-33 Test: todo.service — obtener por ID inexistente (error 404)
- [ ] BE-34 Test: todo.service — actualizar todo
- [ ] BE-35 Test: todo.service — eliminar todo
- [ ] BE-36 Test: todo.service — toggle completado
- [ ] BE-37 Test: todo.controller — GET /api/todos
- [ ] BE-38 Test: todo.controller — POST /api/todos
- [ ] BE-39 Test: todo.controller — GET /api/todos/:id
- [ ] BE-40 Test: todo.controller — PUT /api/todos/:id
- [ ] BE-41 Test: todo.controller — DELETE /api/todos/:id

## Frontend

### Configuración Inicial
- [x] FE-01 Inicializar proyecto React + Vite + TypeScript
- [x] FE-02 Configurar Tailwind CSS
- [x] FE-03 Configurar alias de importación (@/ para src/)
- [x] FE-04 Instalar y configurar Zustand
- [x] FE-05 Instalar y configurar React Hook Form
- [x] FE-06 Configurar scripts en package.json (dev, build, test)

### Shared — Cliente HTTP
- [ ] FE-07 Crear shared/api/client.ts con fetch wrapper (get, post, put, delete)
- [ ] FE-08 Crear shared/types/index.ts (Todo, ApiResponse<T>)

### Shared — UI (componentes base)
- [ ] FE-09 Crear componente Layout (header, contenedor centrado, estilos base)
- [ ] FE-10 Crear componente Loader (indicador de carga)

### Feature TODOs — Store
- [ ] FE-11 Implementar todo.store.ts (todos, loading, setTodos, addTodo, updateTodo, removeTodo)

### Feature TODOs — API Layer
- [ ] FE-12 Implementar todo.api.ts (getAll, getById, create, update, remove)

### Feature TODOs — ViewModel
- [ ] FE-13 Implementar useTodos.ts hook (orquestar store + api + react-hook-form)

### Feature TODOs — Componentes (Views)
- [ ] FE-14 Crear TodoForm.tsx (input + botón crear, usa React Hook Form)
- [ ] FE-15 Crear TodoItem.tsx (checkbox, título, botón eliminar)
- [ ] FE-16 Crear TodoList.tsx (lista de TodoItem + loader cuando carga)
- [ ] FE-17 Integrar componentes en App.tsx (layout + TodoList + TodoForm)

### Feature TODOs — Tests
- [ ] FE-18 Test: cliente HTTP mockeado (todo.api.test.ts)
- [ ] FE-19 Test: store (todo.store.test.ts)
- [ ] FE-20 Test: integración hook + componente (renderizado de lista)
- [ ] FE-21 Test: formulario (creación de todo con react-hook-form)

## Integración y DevOps
- [ ] DEV-01 Configurar proxy de Vite hacia backend (vite.config.ts)
- [ ] DEV-02 Crear script raíz del monorepo para dev en paralelo
- [ ] DEV-03 Crear script raíz para test en ambos proyectos
- [ ] DEV-04 Agregar .gitignore global (node_modules, dist, .env, prisma/*.db)
