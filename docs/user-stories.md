# User Stories — Aplicación TODO

## Backend

---

### US-BE-01: Configuración del proyecto backend

**Estado:** ✅ Completada — SES-20260615-001

**Tareas relacionadas:** BE-01, BE-02, BE-03, BE-04, BE-05, BE-06

```gherkin
Feature: Configuración del Backend
  Scenario: Inicializar proyecto Node.js con Express, TypeScript, Prisma y Vitest
    Given un entorno con Node.js instalado
    When se ejecuta la configuración del proyecto backend
    Then el proyecto compila sin errores con TypeScript
    And Prisma se conecta correctamente a SQLite
    And los tests de humo pasan con Vitest
    And los scripts dev, build y test funcionan
```

---

### US-BE-02: Infraestructura compartida (AppError, Result, error handler)

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-07, BE-08, BE-09

```gherkin
Feature: Infraestructura Compartida
  Scenario: Definir tipos y manejo de errores global
    Given un proyecto Express configurado
    When se definen AppError, Result<T> y el middleware de errores
    Then cualquier error no controlado retorna { success: false, error: { code, message } }
    And los errores conocidos retornan el código HTTP correspondiente
```

---

### US-BE-03: Repositorio de TODOs con Prisma

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-10, BE-11, BE-12, BE-13, BE-14

```gherkin
Feature: Repositorio de TODOs
  Scenario: CRUD de TODOs en base de datos
    Given una base de datos SQLite con el modelo Todo
    When se ejecutan operaciones findAll, findById, create, update, delete
    Then los datos se persisten y recuperan correctamente
    And se reciben objetos completos con id, title, completed, createdAt, updatedAt
```

---

### US-BE-04: Lógica de negocio — Servicio de TODOs

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-15, BE-16, BE-17, BE-18, BE-19, BE-20

```gherkin
Feature: Servicio de TODOs
  Scenario: Gestión de TODOs con reglas de negocio
    Given un repositorio de TODOs funcional
    When un usuario lista, consulta, crea, actualiza o elimina un TODO
    Then el servicio retorna Result<T> con éxito o error
    And las reglas de negocio se validan (título no vacío, máximo 200 caracteres)

  Scenario: Alternar estado completado
    Given un TODO existente
    When el usuario cambia el estado completado
    Then el TODO se marca como completado si estaba pendiente
    And el TODO se marca como pendiente si estaba completado
```

---

### US-BE-05: Validación de datos con Zod

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-21, BE-22

```gherkin
Feature: Validación de Datos
  Scenario: Validar creación de TODO
    Given un controlador REST configurado
    When se envía una solicitud POST /api/todos con datos inválidos
    Then se retorna un error 400 con el detalle de validación
    And el TODO no se persiste en base de datos

  Scenario: Validar actualización de TODO
    Given un TODO existente
    When se envía una solicitud PUT /api/todos/:id con datos inválidos
    Then se retorna un error 400
```

---

### US-BE-06: Controladores REST

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-23, BE-24, BE-25, BE-26, BE-27

```gherkin
Feature: Controladores REST de TODOs
  Scenario: Obtener lista de TODOs
    Given TODOs existentes en base de datos
    When un cliente solicita GET /api/todos
    Then se retorna { success: true, data: Todo[] }

  Scenario: Obtener TODO por ID
    Given un TODO existente
    When un cliente solicita GET /api/todos/:id
    Then se retorna { success: true, data: Todo }

  Scenario: TODO no encontrado
    Given un ID que no existe en base de datos
    When un cliente solicita GET /api/todos/:id
    Then se retorna { success: false, error: { code: "NOT_FOUND", message: "Todo not found" } }
    And el código HTTP es 404

  Scenario: Crear TODO
    Given datos válidos con título
    When un cliente solicita POST /api/todos
    Then se retorna { success: true, data: Todo } con código 201

  Scenario: Actualizar TODO
    Given un TODO existente
    When un cliente solicita PUT /api/todos/:id
    Then se retorna { success: true, data: Todo } con código 200

  Scenario: Eliminar TODO
    Given un TODO existente
    When un cliente solicita DELETE /api/todos/:id
    Then se retorna { success: true, data: null } con código 200
```

---

### US-BE-07: Rutas y montado en app

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-28, BE-29

```gherkin
Feature: Rutas REST de TODOs
  Scenario: Montar rutas del módulo
    Given un servidor Express configurado
    When se monta el router de TODOs bajo /api/todos
    Then los endpoints GET, POST, PUT, DELETE responden correctamente
    And rutas inexistentes retornan 404
```

---

### US-BE-08: Tests TDD del Servicio

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-30, BE-31, BE-32, BE-33, BE-34, BE-35, BE-36

```gherkin
Feature: Tests del Servicio de TODOs
  Scenario: Servicio con lista vacía
    Given no hay TODOs en base de datos
    When se ejecuta getAll
    Then se retorna un arreglo vacío con success: true

  Scenario: Creación exitosa
    Given datos válidos
    When se ejecuta create
    Then se retorna un TODO con id, title, completed: false

  Scenario: Búsqueda por ID inexistente
    Given un ID que no existe
    When se ejecuta getById
    Then se retorna error con código NOT_FOUND y httpStatus 404

  Scenario: Actualización de TODO existente
    Given un TODO existente con datos para actualizar
    When se ejecuta update
    Then el TODO se actualiza correctamente

  Scenario: Eliminación de TODO existente
    Given un TODO existente
    When se ejecuta remove
    Then se retorna success: true sin data

  Scenario: Toggle de completado
    Given un TODO existente con completed: false
    When se ejecuta toggle
    Then el TODO retorna con completed: true
```

---

### US-BE-09: Tests TDD del Controlador

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** BE-37, BE-38, BE-39, BE-40, BE-41

```gherkin
Feature: Tests del Controlador REST
  Scenario: GET /api/todos retorna lista
    Given el servicio retorna TODOs exitosamente
    When se llama al controlador GET
    Then la respuesta tiene status 200 con formato { success: true, data: Todo[] }

  Scenario: POST /api/todos sin título retorna 400
    Given una solicitud con título vacío
    When se llama al controlador POST
    Then la respuesta tiene status 400

  Scenario: GET /api/todos/:id de TODO inexistente
    Given el servicio retorna error NOT_FOUND
    When se llama al controlador GET /:id
    Then la respuesta tiene status 404

  Scenario: DELETE /api/todos/:id exitoso
    Given el servicio retorna éxito en eliminación
    When se llama al controlador DELETE /:id
    Then la respuesta tiene status 200 con data: null
```

---

## Frontend

---

### US-FE-01: Configuración del proyecto frontend

**Estado:** ✅ Completada — SES-20260615-002

**Tareas relacionadas:** FE-01, FE-02, FE-03, FE-04, FE-05, FE-06

```gherkin
Feature: Configuración del Frontend
  Scenario: Inicializar proyecto con React, Vite, TypeScript, Tailwind
    Given Node.js instalado
    When se ejecuta la configuración del proyecto frontend
    Then el proyecto compila con Vite sin errores
    And Tailwind CSS aplica estilos correctamente
    And Zustand y React Hook Form están instalados
```

---

### US-FE-02: Cliente HTTP y tipos compartidos

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-07, FE-08

```gherkin
Feature: Cliente HTTP base con Fetch
  Scenario: Consumir API REST desde el frontend
    Given un backend disponible en http://localhost:3000/api
    When se crea un wrapper de fetch con métodos get, post, put, delete
    Then las llamadas al backend retornan datos tipados como ApiResponse<T>
    And si el backend cambia de URL, solo se modifica un archivo
```

---

### US-FE-03: Componentes base de UI

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-09, FE-10

```gherkin
Feature: Componentes base de interfaz
  Scenario: Mostrar layout y loader
    Given la aplicación inicia
    When se renderiza el Layout
    Then se muestra un encabezado y un contenedor centrado con estilos Tailwind
    And cuando hay carga de datos, se muestra un Loader animado
```

---

### US-FE-04: Store de TODOs con Zustand

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-11

```gherkin
Feature: Estado global de TODOs
  Scenario: Gestionar TODOs en estado global
    Given una store Zustand inicializada
    When se agrega, actualiza o elimina un TODO
    Then el estado se actualiza de forma inmutable
    And todos los componentes suscritos se re-renderizan
```

---

### US-FE-05: Capa de API de TODOs

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-12

```gherkin
Feature: API Layer de TODOs
  Scenario: Comunicación con backend REST
    Given un cliente HTTP configurado
    When se llama a todoApi.getAll, .create, .update, .remove
    Then las solicitudes se envían a /api/todos con el método HTTP correcto
    And se retorna la respuesta tipada ApiResponse<Todo>
```

---

### US-FE-06: ViewModel — useTodos hook

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-13

```gherkin
Feature: ViewModel de TODOs
  Scenario: Orquestar store, API y formulario
    Given un componente TODO montado
    When el ViewModel useTodos se ejecuta
    Then carga la lista de TODOs al iniciar
    And expone funciones createTodo, toggleTodo, deleteTodo
    And expone el controlador de React Hook Form
```

---

### US-FE-07: Formulario de creación de TODOs

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-14

```gherkin
Feature: Formulario de creación
  Scenario: Crear un nuevo TODO
    Given un formulario con React Hook Form
    When el usuario escribe un título y presiona "Agregar"
    Then se llama a createTodo del ViewModel
    And el campo se limpia después de crear
    And el TODO aparece en la lista

  Scenario: Validación del formulario
    Given un formulario vacío
    When el usuario intenta crear un TODO sin título
    Then se muestra un mensaje de validación
    And no se envía la solicitud al backend
```

---

### US-FE-08: Lista y elementos TODO

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-15, FE-16, FE-17

```gherkin
Feature: Lista de TODOs
  Scenario: Mostrar TODOs existentes
    Given TODOs cargados en la store
    When se renderiza TodoList
    Then cada TODO se muestra como un TodoItem con checkbox y botón eliminar

  Scenario: Marcar TODO como completado
    Given un TODO visible en la lista
    When el usuario hace clic en el checkbox
    Then se llama a toggleTodo del ViewModel
    And el TODO se actualiza visualmente (tachado o atenuado)

  Scenario: Eliminar TODO
    Given un TODO visible en la lista
    When el usuario hace clic en el botón eliminar
    Then se llama a deleteTodo del ViewModel
    And el TODO desaparece de la lista

  Scenario: Estado de carga
    Given TODOs cargándose desde el backend
    When la lista está en estado loading
    Then se muestra un Loader en lugar de la lista
    And cuando la carga termina, se muestran los TODOs
```

---

### US-FE-09: Tests del frontend

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** FE-18, FE-19, FE-20, FE-21

```gherkin
Feature: Tests del Frontend
  Scenario: Test de store
    Given una store Zustand limpia
    When se ejecutan acciones addTodo, updateTodo, removeTodo
    Then el estado se actualiza correctamente

  Scenario: Test de API mockeada
    Given un mock del cliente HTTP
    When se llama a todoApi.getAll
    Then retorna datos simulados sin llamar al backend real

  Scenario: Test de integración hook + componente
    Given un hook useTodos con API mockeada
    When el componente TodoList se renderiza
    Then muestra los TODOs mockeados

  Scenario: Test de formulario
    Given React Hook Form configurado
    When el usuario envía un título válido
    Then se ejecuta la función de creación sin errores
```

---

## Integración

---

### US-DEV-01: Configuración del Monorepo

**Estado:** ⏳ Pendiente

**Tareas relacionadas:** DEV-01, DEV-02, DEV-03, DEV-04

```gherkin
Feature: Integración del Monorepo
  Scenario: Scripts compartidos y proxy
    Given un monorepo con npm workspaces
    When se ejecuta npm run dev desde la raíz
    Then el frontend y backend inician en paralelo
    And Vite proxy redirige /api/* al backend
    And npm run test ejecuta tests de ambos proyectos
```
