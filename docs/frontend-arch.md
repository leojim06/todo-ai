# Arquitectura del Frontend

## Enfoque
- **Feature-Based MVVM** — cada feature es autocontenida con su View, ViewModel, Store y API
- **Manejo de estado:** Zustand (stores globales por feature)
- **Formularios:** React Hook Form
- **Cliente HTTP:** Fetch API nativa (sin Axios ni dependencias externas)

## Estructura de Carpetas

```
frontend/
├── src/
│   ├── main.tsx                       # Punto de entrada
│   ├── App.tsx                        # Componente raíz
│   ├── shared/
│   │   ├── api/
│   │   │   └── client.ts             # Cliente HTTP base con fetch wrapper
│   │   ├── types/
│   │   │   └── index.ts              # Tipos compartidos (Todo, ApiResponse<T>, etc.)
│   │   └── lib/
│   │       └── utils.ts              # Funciones utilitarias
│   └── features/
│       └── todos/
│           ├── api/
│           │   └── todo.api.ts       # Llamadas específicas al backend
│           ├── store/
│           │   └── todo.store.ts     # Estado global con Zustand
│           ├── components/
│           │   ├── TodoList.tsx      # View — lista de TODOs
│           │   ├── TodoItem.tsx      # View — item individual
│           │   └── TodoForm.tsx      # View — formulario crear/editar
│           └── hooks/
│               └── useTodos.ts       # ViewModel — orquesta store + API + React Hook Form
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── package.json
```

## Capas y Responsabilidades

### 1. Shared — Cliente HTTP (`shared/api/client.ts`)

Wrapper centralizado de `fetch`. Es el único punto de contacto con el backend.

```typescript
const BASE_URL = 'http://localhost:3000/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string }
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  return response.json()
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}
```

Si cambia el backend (URL, headers, auth), solo se modifica este archivo.

### 2. Feature — API Layer (`features/todos/api/todo.api.ts`)

Define las funciones específicas del recurso `todos`.

```typescript
import { api } from '@/shared/api/client'
import type { Todo } from '@/shared/types'

export const todoApi = {
  getAll: () => api.get<Todo[]>('/todos'),
  getById: (id: string) => api.get<Todo>(`/todos/${id}`),
  create: (title: string) => api.post<Todo>('/todos', { title }),
  update: (id: string, data: Partial<Pick<Todo, 'title' | 'completed'>>) =>
    api.put<Todo>(`/todos/${id}`, data),
  remove: (id: string) => api.delete<Todo>(`/todos/${id}`),
}
```

### 3. Feature — Store (`features/todos/store/todo.store.ts`)

Estado global con Zustand.

```typescript
import { create } from 'zustand'
import type { Todo } from '@/shared/types'

interface TodoStore {
  todos: Todo[]
  loading: boolean
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: string, data: Partial<Todo>) => void
  removeTodo: (id: string) => void
  setLoading: (loading: boolean) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (id, data) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  setLoading: (loading) => set({ loading }),
}))
```

### 4. Feature — ViewModel (`features/todos/hooks/useTodos.ts`)

Orquesta el Store + API + React Hook Form. Es el "controlador" que las Views consumen.

```typescript
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTodoStore } from '../store/todo.store'
import { todoApi } from '../api/todo.api'

interface TodoFormData {
  title: string
}

export function useTodos() {
  const { todos, loading, setTodos, addTodo, updateTodo, removeTodo, setLoading } =
    useTodoStore()

  const form = useForm<TodoFormData>({
    defaultValues: { title: '' },
  })

  useEffect(() => {
    setLoading(true)
    todoApi.getAll().then((res) => {
      if (res.success && res.data) setTodos(res.data)
      setLoading(false)
    })
  }, [])

  const createTodo = form.handleSubmit(async (data) => {
    const res = await todoApi.create(data.title)
    if (res.success && res.data) addTodo(res.data)
    form.reset()
  })

  const toggleTodo = async (id: string, completed: boolean) => {
    const res = await todoApi.update(id, { completed: !completed })
    if (res.success && res.data) updateTodo(id, res.data)
  }

  const deleteTodo = async (id: string) => {
    const res = await todoApi.remove(id)
    if (res.success) removeTodo(id)
  }

  return { todos, loading, form, createTodo, toggleTodo, deleteTodo }
}
```

### 5. Feature — Views (`features/todos/components/`)

Componentes React puros de presentación. Reciben todo desde el ViewModel.

```
TodoForm.tsx      ← usa react-hook-form (registrado en el ViewModel)
  ↓
TodoList.tsx      ← itera sobre todos[]
  ↓
TodoItem.tsx      ← renderiza un TODO, llama a toggleTodo / deleteTodo
```

## Flujo Completo de Datos

```
User interactúa con View (componente)
  → View llama a ViewModel (useTodos hook)
    → ViewModel actualiza Store (Zustand)
    → ViewModel llama a API Layer (todo.api.ts)
      → API Layer usa el Client (shared/api/client.ts)
        → Client hace fetch al Backend
    → Store notifica a las Views reactivas
  → View se re-renderiza con nuevo estado
```

## Cambio de Backend

Si el backend cambia (URL, estructura, incluso a GraphQL):
1. Se modifica `shared/api/client.ts` (solo un archivo)
2. Se actualiza `features/todos/api/todo.api.ts` según los nuevos endpoints
3. Store, ViewModel y Views quedan intactos
