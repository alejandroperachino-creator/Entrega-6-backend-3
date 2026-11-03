# Bitácora técnica del proyecto ShipNow

## 1) Alcance y criterio de trabajo

Este proyecto se desarrolló como práctica de Backend III con un enfoque profesional:

- priorizar código correcto antes que "código rápido"
- separar responsabilidades por capas
- evitar comportamientos silenciosos ante errores
- documentar decisiones y deuda técnica de forma explícita

## 2) Línea de evolución del proyecto

### Etapa A - Base y estructura

Se definió la base Express + MongoDB y la organización por capas:

- `app.js` para middlewares y rutas
- `server.js` para bootstrap y conexión a MongoDB
- `routes/controllers/services/repositories/models`

Resultado: estructura mantenible para crecer sin acoplar lógica HTTP con negocio.

### Etapa B - Dominio y casos de negocio

Se modelaron entidades principales: usuarios, productos, pedidos y entregas.

Se implementaron CRUDs y validaciones de negocio mínimas en services:

- existencia de recursos relacionados
- datos requeridos antes de persistir
- estados y prioridades con constantes

Resultado: API funcional con reglas claras en la capa de negocio.

### Etapa C - Errores centralizados

Se migró a manejo de errores uniforme:

- diccionario central en `src/utils/errors.js`
- `createError` + `CustomError`
- middleware global de errores
- middleware 404 para rutas no existentes

Resultado: respuestas consistentes para cliente y mejor capacidad de depuración.

### Etapa D - Logging y observabilidad

Se incorporó logging estructurado:

- logger central con niveles
- middleware HTTP para trazas por request
- salida por consola y archivos rotados
- endpoints técnicos para validar logging y flujo de errores

Resultado: mayor trazabilidad operacional y evidencia de comportamiento.

### Etapa E - Swagger/OpenAPI

Se documentaron endpoints reales de la API:

- configuración en `src/config/swagger.js`
- UI en `/api/docs` y `/api-docs`
- documentación por módulos (`Users`, `Products`, `Orders`, `Deliveries`, `Mocks`, `Logger`)
- schemas y respuestas reutilizables

Resultado: documentación útil para revisión académica y pruebas manuales.

### Etapa F - Clase 6: Testing funcional (Mocha + Chai + Supertest)

Se integró una suite funcional automatizada en `tests/functional/` con foco en contratos HTTP y formato de errores:

- entorno de testing separado con `.env.test` y base dedicada de pruebas
- separación `app.js` / `server.js` para testear sin levantar puerto manual
- casos de éxito y error para `users`, `orders`, `mocks`, `logger`, `swagger` y ruta inexistente
- validación de status HTTP + estructura de body + propiedades relevantes
- limpieza de datos con hooks (`beforeEach`) y cierre limpio de conexión en `after`

Resultado: suite repetible que corre desde cero y valida comportamiento funcional esperado del módulo.

Cobertura implementada en la entrega:

- `GET /api/users`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id`
- `GET /api/mocks/users` (éxito y error)
- `GET /api/mocks/orders` (éxito y error)
- `GET /api/logger`
- `GET /api/logger/error`
- `GET /api/docs/`
- `GET /api/ruta-inexistente`

Evidencia de repetibilidad:

- ejecuciones de referencia de la suite funcional con resultado: `16 passing`
- pruebas destacadas ejecutadas:
  - `GET /api/users`
  - `POST /api/orders`
  - `PUT /api/orders/:id`
  - `GET /api/mocks/users`
  - `GET /api/logger/error`

## 3) Ajustes de calidad realizados

Durante revisión final se corrigieron desalineaciones entre configuración y documentación:

1. `PORT` pasó a ser configurable por variable de entorno con default `3003`.
2. `servers.url` de Swagger se alineó al puerto real de runtime (`config.port`).
3. `.env.example` se actualizó a `PORT=3003` para evitar confusión.
4. README y bitácora se actualizaron para reflejar comportamiento real del código.

## 4) Validación ejecutada

Validaciones de referencia del proyecto:

- arranque del servidor y conexión a MongoDB
- disponibilidad de `/api/health`
- carga de Swagger UI (`/api/docs` y `/api-docs`)
- pruebas de rutas técnicas de logger
- ejecución de pruebas con `npm test`
- ejecución de la suite funcional dos veces seguidas sin limpieza manual

## 5) Riesgos, deuda técnica y próximos pasos

Pendientes reconocidos para mejora continua:

- ampliar cobertura de pruebas de integración por módulo
- agregar validaciones de esquema más estrictas en algunos endpoints
- consolidar ejemplos OpenAPI para casos de error menos frecuentes
- evaluar autenticación/autorización real cuando el alcance lo requiera

## 6) Cierre

El proyecto quedó en un estado más consistente entre implementación, documentación y criterios profesionales.

La prioridad fue sostener:

- corrección técnica
- claridad de diseño
- trazabilidad operativa
- ética profesional (transparencia sobre fallos, decisiones y límites actuales)
