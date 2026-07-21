# Salud Familiar — PWA de Telemedicina para el Adulto Mayor

PWA para gestión de citas médicas y recetas, diseñada para adultos mayores (diabetes, baja visión, hipoacusia). Cumple WCAG 2.1, funciona offline, y está respaldada por un backend real con base de datos.

## Estructura del monorepo

```
/
├── backend/    Express + Prisma + SQLite (API REST + base de datos)
├── frontend/   React + Vite (PWA)
├── docs/       Documentación de Fase 1, reflexión crítica, reporte Lighthouse
└── .github/    Pipeline de CI/CD (GitHub Actions)
```

## Requisitos

- Node.js 20+
- npm

## Instalación

```bash
npm run install:all
```

Esto instala las dependencias de `backend/` y `frontend/` por separado.

Copia los archivos de entorno de ejemplo:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Crea y siembra la base de datos (SQLite, local, no requiere instalar nada extra):

```bash
cd backend
npx prisma migrate dev
cd ..
```

## Correr en desarrollo

```bash
npm run dev
```

Levanta el backend (`http://localhost:4000`) y el frontend (`http://localhost:5173`) en paralelo. También se pueden correr por separado con `npm run dev:backend` / `npm run dev:frontend`.

**Usuarios de prueba** (mismo password para los 4): `priscila`, `fernando`, `augusto`, `belen` — contraseña `demo1234`.

## Pruebas

```bash
npm test              # backend + frontend (unitarias, con cobertura)
npm run e2e            # resetea la BD, levanta ambos servidores y corre Cypress
```

## Build de producción

```bash
npm run build
```

## Despliegue

- **Frontend:** Vercel, con *Root Directory* = `frontend` (el `vercel.json` ya incluido resuelve el ruteo de React Router).
- **Backend:** pensado para correr localmente durante la sustentación (`npm run dev --prefix backend` o `npm start --prefix backend`). SQLite es un archivo local — no requiere servidor de base de datos externo.

## Documentación

- [`docs/reflexion-critica.md`](docs/reflexion-critica.md) — resiliencia, accesibilidad, dificultades y mejoras.
- [`docs/lighthouse/report.html`](docs/lighthouse/report.html) — auditoría de rendimiento y estándares.
- Prototipo Figma, investigación de usuarios y Atomic Design: documentos de la Fase 1 (entrega separada).
