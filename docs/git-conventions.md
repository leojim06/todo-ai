# Git Conventions

## Commits
- **Idioma:** Inglés
- **Estándar:** Conventional Commits (https://www.conventionalcommits.org/)
- **Formato:** `<type>(<scope>): <description>`
- **Tipos permitidos:** `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `perf`
- **Scope:** `backend`, `frontend`, `monorepo`, `deps`
- **Ejemplos:**
  ```
  feat(backend): implement todo creation endpoint
  test(frontend): add todo store unit tests
  chore(monorepo): configure npm workspaces
  ```

## Branch Strategy
- **Trunk-Based Development**
- Rama principal: `main` (trunk)
- Ramas temporales de corta duración desde `main`
- Nomenclatura: `type/description` (ej: `feat/todo-service`, `fix/empty-title-validation`)
- No se usan ramas `develop` ni `release`
- Se elimina la rama después de mergear

## Versionado
- **Semantic Versioning** (SemVer) — `MAJOR.MINOR.PATCH`
- Tags en git con formato `v1.2.3`
- `npm version` para actualizar versión automáticamente
- `MAJOR`: cambios incompatibles en API
- `MINOR`: nuevas funcionalidades compatibles
- `PATCH`: bug fixes compatibles

## Pull Requests
- Título en inglés siguiendo conventional commits
- Descripción opcional con cambios principales
- Mínimo 1 approval antes de mergear (cuando aplique equipo)
- Squash merge a `main`
