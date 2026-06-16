# Session Rules — Seguimiento de Trabajo

Define las reglas de uso de la carpeta `progress/` para el seguimiento de sesiones de trabajo y los puntos de aprobación humana obligatorios.

---

## Estructura

```
progress/
├── session.md          ← Archivo activo de la sesión actual
├── history.md          ← Historial acumulativo de sesiones completadas
└── tdd-history.md      ← Registro detallado de cada ciclo TDD
```

---

## Reglas de `session.md`

### Propósito
Registrar en tiempo real el progreso de una sesión de trabajo mientras los agentes convierten una User Story en código.

### Ciclo de vida
1. **Inicio:** se completa la plantilla al empezar a trabajar una US.
2. **Durante:** el agente activo actualiza `Plan`, `Bitácora` y `Próximos pasos` en tiempo real.
3. **Migración:** antes de que un agente modifique `session.md`, el Orchestrator consolida el estado actual en `progress/history.md` (dump del paso).
4. **Cierre:** al completar una US con health check final OK, se vacía `session.md` dejando solo la plantilla estática.

### Secciones de la plantilla

| Sección | Descripción |
|---|---|
| `Sesión` | ID único auto-generado: `SES-YYYYMMDD-NNN` |
| `US en curso` | Número y nombre de la User Story |
| `Inicio` | Fecha/hora de inicio en formato `dd-MM-yyyy hh:mm:ss.sss` |
| `Agente` | Nombre del subagente activo + Estado (`activo`, `esperando`, `completado`) |
| `Plan` | Descripción de lo que el agente planea realizar |
| `Bitácora` | Historial de acciones: archivos modificados, decisiones tomadas, resultados |
| `Próximos pasos` | Siguientes acciones o indicación de pasar al siguiente agente |
| `Checklist` | Lista de verificación obligatoria antes de cerrar la sesión |

### Checklist obligatorio
Cada sesión debe cumplir estos puntos antes de cerrarse:
- [ ] Compila sin errores
- [ ] Tests unitarios pasan
- [ ] Linter sin errores
- [ ] Código sigue las convenciones del proyecto

---

## Reglas de `history.md`

### Propósito
Mantener un registro inmutable y acumulativo de todas las sesiones completadas para trazabilidad total.

### Formato
Cada sesión se estructura en dos niveles de jerarquía:
- `###` — bloque de sesión
- `####` — cada paso dentro de la sesión

```markdown
### SES-YYYYMMDD-NNN — dd-MM-yyyy hh:mm:ss.sss
**US:** # — Nombre
**Estado:** Completada

#### Paso N: Título del paso
- **Inicio:** dd-MM-yyyy hh:mm:ss.sss
- **Agente:** Nombre del agente
- **Acción:** Descripción de lo que se hizo
- **Resultado:** ✅ OK / ❌ Fallo
- **Aprobación humana:** ✅ Confirmada
```

### Orden
Cada nueva entrada se agrega al **final** del archivo. **Nunca se editan ni reordenan entradas existentes.**

---

## Reglas de `tdd-history.md`

### Propósito
Registrar en tiempo real cada paso del ciclo TDD (Rojo, Verde, Refactor) durante el flujo asistido por IA.

### Formato
`dd-MM-yyyy hh:mm:ss.sss | emoticon | descripción breve`

Emoticones disponibles:
- `🔴` — test escrito y falla como esperado
- `🟢` — código implementado y test pasa
- `🔧` — código refactorizado

### Orden
Cada nueva entrada se agrega al **final** del archivo. **Nunca se editan ni reordenan entradas existentes.**

### Responsable
El archivo es escrito exclusivamente por `implementation-agent` al completar cada fase del ciclo TDD.

---

## Puntos de aprobación humana

Cada transición entre agentes o fases requiere aprobación explícita del humano mediante el tool `question`. Ningún agente puede avanzar al siguiente paso sin confirmación.

| # | Agente | Acción | Pregunta al humano |
|---|---|---|---|
| 1 | Orchestrator | Health Check pasado | "Health Check OK. ¿Deseas iniciar una nueva sesión?" |
| 2 | Orchestrator | US seleccionada | "Propongo US-XXX: Nombre. ¿Confirmas?" |
| 3 | Git Agent | Nombre de rama | "Rama propuesta: `type/desc`. ¿Confirmas o prefieres otro nombre?" |
| 4 | Implementation | Rojo (test escrito) | "Test listo. ¿Apruebas que lo ejecute para verlo fallar?" |
| 5 | Implementation | Verde (código escrito) | "Implementación lista. ¿Apruebas que ejecute el test?" |
| 6 | Implementation | Refactor | "Código refactorizado. ¿Confirmas que está correcto?" |
| 7 | Implementation | Fin de ciclo | "Ciclo completado. ¿Siguiente test o pasamos a verificación?" |
| 8 | Verification | Resultado | "Verificación: APROBADO/RECHAZADO. ¿Confirmas? ¿Deseas cambios adicionales?" |
| 9 | Git Agent | Commit | "Archivos a commitear: [lista]. Mensaje: `type(scope): desc`. ¿Apruebas?" |
| 10 | Git Agent | Push | "Commit listo en local. ¿Deseas hacer push al remoto?" |
| 11 | Orchestrator | Health Check final | "Health Check final OK. ¿Confirmas el cierre de la sesión?" |
