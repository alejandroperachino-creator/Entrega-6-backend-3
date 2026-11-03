# ShipNow API (Backend III)

API de logística con Node.js, Express y MongoDB, organizada por capas y documentada con Swagger/OpenAPI.

## Objetivo académico

Construir una API mantenible y profesional, priorizando:

- separación de responsabilidades por capas
- manejo centralizado de errores
- observabilidad con logging
- documentación técnica usable para revisión y pruebas

## Stack técnico

- Node.js + Express
- MongoDB + Mongoose
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- Winston + `winston-daily-rotate-file`
- Faker para datos mock
- Mocha + Chai + Supertest

## Arquitectura

Flujo principal:

`routes -> controllers -> services -> repositories -> models`

Estructura relevante:

- `src/routes/` endpoints HTTP
- `src/controllers/` capa HTTP
- `src/services/` reglas de negocio
- `src/repositories/` acceso a datos
- `src/models/` esquemas Mongoose
- `src/middlewares/` middlewares de errores, logging y 404
- `src/utils/` logger y utilidades de errores
- `src/config/` configuración de entorno y Swagger

## Requisitos

- Node.js 18+
- MongoDB local o remoto

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Crear variables de entorno:

```bash
# Linux/macOS/Git Bash
cp .env.example .env

# PowerShell (Windows)
Copy-Item .env.example .env
```

3. Levantar en desarrollo:

```bash
npm run dev
```

4. Swagger UI:

- `http://localhost:3003/api/docs`
- `http://localhost:3003/api-docs`

## Variables de entorno

| Variable | Requerida | Descripción | Default |
| --- | --- | --- | --- |
| `PORT` | No | Puerto HTTP de la API | `3003` |
| `MONGODB_URI` | No | URI de conexión a MongoDB | `mongodb://localhost:27017/shipnow` |
| `MONGO_URI_TEST` | No | URI de MongoDB para pruebas de integración de usuarios | `mongodb://localhost:27017/shipnow_test` |
| `NODE_ENV` | No | Entorno (`development`, `test`, `production`) | `development` |
| `LOG_LEVEL` | No | Nivel mínimo de logging | `info` |
| `JWT_SECRET` | No | Valor disponible en config para usos futuros | `""` |

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Levanta servidor con nodemon |
| `npm start` | Levanta servidor con node |
| `npm test` | Ejecuta suite funcional (`mocha`) |

## Rutas principales

Base: `/api`

- `GET /api/health`
- CRUD:
  - `/api/users`
  - `/api/products`
  - `/api/orders`
  - `/api/deliveries`
- Mocks:
  - `GET /api/mocks/user`
  - `GET /api/mocks/users`
  - `GET /api/mocks/orders`
  - `GET /api/mocks/deliveries`
  - `GET /api/mocks/snapshot`
  - `POST /api/mocks/seed`
  - `POST /api/mocks/seed/users`
  - `POST /api/mocks/seed/orders`
  - `POST /api/mocks/seed/deliveries`
  - `POST /api/mocks/seed/all`
- Logger técnico:
  - `GET /api/logger`
  - `GET /api/logger/test`
  - `GET /api/logger/error`

## Formato de errores

La API normaliza los errores desde un diccionario central (`src/utils/errors.js`) y los responde con un formato consistente:

```json
{
  "success": false,
  "status": "fail",
  "error": {
    "id": 12,
    "code": "INVALID_ID_ERROR",
    "message": "Id inválido"
  },
  "timestamp": "2026-10-19T22:00:00.000Z"
}
```

## Logging y trazabilidad

- Request logging por middleware HTTP
- Logs de aplicación y errores con Winston
- Archivos rotados en `logs/`
- Endpoints de prueba para validar observabilidad (`/api/logger/*`)

## Testing funcional (Módulo 6)

Herramientas usadas:

- **Mocha** para organizar y ejecutar la suite funcional
- **Chai** para aserciones de estructura y contenido
- **Supertest** para peticiones HTTP contra la app Express

Cómo ejecutar:

```bash
npm test
```

Estado actual de la suite:

- resultado de referencia: `16 passing`
- ejemplos de pruebas ejecutadas:
  - `GET /api/users`
  - `POST /api/orders`
  - `PUT /api/orders/:id`
  - `GET /api/mocks/users`
  - `GET /api/logger/error`

Cobertura funcional incluida (`tests/functional/`):

- `GET /api/users`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id` (actualización de estado)
- Endpoints de mocks (`/api/mocks/users`, `/api/mocks/orders`) con éxito y error
- Endpoints de logger (`/api/logger`, `/api/logger/error`)
- Swagger (`/api/docs/`)
- Ruta inexistente (`404`)

Entorno de testing separado:

- Archivo dedicado: `.env.test` (podés crearlo desde `.env.test.example`)
- `NODE_ENV=test`
- Base de datos de prueba por defecto: `mongodb://localhost:27017/shipnow_test`
- Variables soportadas para tests:
  - `MONGO_URI_TEST` (preferida)
  - `MONGODB_URI_TEST` (compatibilidad)
  - `MONGODB_URI` (fallback)

Estrategia de datos y limpieza:

- Los tests crean datos de forma controlada dentro de cada caso.
- Antes de cada test se limpian colecciones relevantes (`users`, `orders`, `deliveries`).
- Al finalizar la suite se elimina la base de testing y se cierra la conexión.

## Criterio profesional y ética aplicada

Este proyecto se trabaja con foco en:

- **corrección técnica**: validar entradas, errores y respuestas
- **consistencia**: contratos HTTP y errores uniformes
- **mantenibilidad**: capas separadas y responsabilidades claras
- **trazabilidad**: logs útiles para diagnóstico real
- **ética profesional**: no hardcodear secretos, no ocultar fallos y documentar el comportamiento real de la API

## Bitácora del proyecto

El historial técnico y decisiones del proyecto está en:

- `BITACORA_PROYECTO.md`
