# AGENTS.md — Entry Point

Este archivo es el punto de entrada para la orquestación de agentes de IA en el proyecto `todo-ai`. Define el flujo obligatorio antes de comenzar cualquier trabajo sobre una User Story.

---

## Flujo obligatorio

### Paso 1 — Health Check (Gate)

**Regla:** Antes de tocar cualquier User Story, el proyecto debe compilar y pasar todos los tests unitarios en ambos workspaces.

**Proyectos:**
- `backend/` → `npm run build && npm run test`
- `frontend/` → `npm run build && npm run test`
- Raíz (monorepo) → `npm run build && npm run test`

**Si falla:**
1. Detener el flujo.
2. Reportar qué proyecto(s) fallaron y el error exacto.
3. No se puede avanzar hasta que el health check pase en verde (0 errors, 0 failing tests).

**Si pasa:**
1. Continuar con el siguiente paso del flujo.
2. Iniciar sesión de trabajo en `progress/session.md`.

---

## Referencias para agentes

| Documento | Propósito |
|---|---|
| `docs/git-conventions.md` | Commits, branches, versionado, PRs |
| `docs/STACK.md` | Stack tecnológico y estructura del proyecto |
| `docs/session-rules.md` | Reglas de manejo de sesiones (`progress/session.md` y `progress/history.md`) |
| `docs/tasks.md` | Lista de tareas por funcionalidad |
| `docs/user-stories.md` | User Stories del proyecto |
