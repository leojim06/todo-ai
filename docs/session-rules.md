# Session Rules — Seguimiento de Trabajo

Define las reglas de uso de la carpeta `progress/` para el seguimiento de sesiones de trabajo.

---

## Estructura

```
progress/
├── session.md      ← Archivo activo de la sesión actual
└── history.md      ← Historial acumulativo de sesiones completadas
```

---

## Reglas de `session.md`

### Propósito
Registrar en tiempo real el progreso de una sesión de trabajo mientras los agentes convierten una User Story en código.

### Ciclo de vida
1. **Inicio:** se completa la plantilla al empezar a trabajar una US.
2. **Durante:** el agente activo actualiza `Plan`, `Bitácora` y `Próximos pasos` en tiempo real.
3. **Migración:** antes de modificar `session.md`, se copia un resumen del contenido actual a `progress/history.md`.
4. **Cierre:** al completar una US (implementada, testeada, funcionando), se vacía `session.md` dejando solo la plantilla estática.

### Secciones de la plantilla

| Sección | Descripción |
|---|---|
| `Sesión` | ID único auto-generado: `SES-YYYYMMDD-NNN` |
| `US en curso` | Número y nombre de la User Story |
| `Inicio` | Fecha/hora de inicio en formato `dd-MM-yyyy hh:mm` |
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
Mantener un registro acumulativo de todas las sesiones completadas para trazabilidad.

### Formato de cada entrada
```markdown
## SES-YYYYMMDD-NNN — dd-MM-yyyy
- **US:** # — Nombre
- **Agente:**
- **Resumen:**
```

### Orden
Cada nueva entrada se agrega al **inicio** del archivo (la más reciente primero).
