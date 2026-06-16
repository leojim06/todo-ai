# AGENTS.md — Entry Point

Este archivo es el punto de entrada para la orquestación de agentes de IA en el proyecto `todo-ai`. Define el flujo obligatorio antes de comenzar cualquier trabajo sobre una User Story.

---

## Reglas no negociables

- **Git Agency:** Ningún agente (incluido Orchestrator) puede ejecutar `git commit` o `git push` directamente. Estas operaciones son exclusivas del `git-agent` y requieren aprobación humana explícita (**Gates 9 y 10**).
- **Historial inmutable:** Los archivos `progress/history.md` y `progress/tdd-history.md` son de solo agregar (append-only). **Nunca se editan, reescriben ni modifican entradas existentes.** Solo se agregan nuevas líneas al final. Cualquier intento de modificar entradas pasadas está prohibido.

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

## Flujo completo de orquestación

### Agentes del sistema

| Agente | Archivo | Rol |
|---|---|---|
| Orchestrator | `agents/orchestrator.md` | Coordina, valida health check, gestiona sesión, selecciona US |
| Git Agent | `agents/git-agent.md` | Ramas, commits, Pull Requests |
| Implementation Agent | `agents/implementation-agent.md` | TDD (Rojo → Verde → Refactor) |
| Verification Agent | `agents/verification-agent.md` | Revisa y aprueba/rechaza el código |

### Secuencia

```
Orchestrator
  │
  ├─ 1. Health Check (build + test)
  ├─ 2. Revisar progress/session.md → reanudar o iniciar
  ├─ 3. Leer docs/user-stories.md → seleccionar US
  ├─ 4. Presentar US al usuario → confirmación
  │
  ├─ 5. Git Agent → crear rama
  ├─ 6. Implementation Agent → ciclo TDD (rojo → verde → refactor)
  ├─ 7. Verification Agent → revisar y aprobar/rechazar
  │     └─ Si rechaza → volver al paso 6
  ├─ 8. Git Agent → commit
  │
  ├─ 9. Health Check final
  ├─ 10. Migrar resumen a progress/history.md
  └─ 11. Vaciar progress/session.md
```

---

## Referencias para agentes

| Documento | Propósito |
|---|---|
| `docs/git-conventions.md` | Commits, branches, versionado, PRs |
| `docs/STACK.md` | Stack tecnológico y estructura del proyecto |
| `docs/session-rules.md` | Reglas de manejo de sesiones (`progress/session.md` y `progress/history.md`) |
| `docs/tasks.md` | Lista de tareas por funcionalidad |
| `docs/user-stories.md` | User Stories del proyecto |
| `agents/*.md` | Definiciones de cada agente del sistema |
