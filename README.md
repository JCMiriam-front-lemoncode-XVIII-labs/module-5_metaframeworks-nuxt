# Módulo 5 Metaframeworks · Nuxt

Portal de alquiler vacacional de casas rurales desarrollado para el laboratorio de MetaFrameworks de Lemoncode. La aplicación consume el `api-server` oficial del curso y permite explorar, buscar y consultar el detalle de sus alojamientos.

## Requisitos implementados

- Listado responsive de casas rurales.
- Página de detalle con descripción, dirección, habitaciones, camas, baños, servicios y reseñas.
- Navegación entre listado y detalle.
- Server-Side Rendering en ambas páginas.
- Consumo de `GET /api/houses` y `GET /api/houses/:id`.
- Estilos encapsulados y compatibles con SSR mediante CSS scoped externos.

### Opcionales

- Búsqueda instantánea por nombre o ciudad.
- Botón de solicitud de reserva con confirmación visual.
- Optimización de imágenes con `@nuxt/image`.
- Metadatos dinámicos para cada alojamiento.
- Valoración media calculada a partir de las reseñas.
- Página 404 y estado de error con opción de reintento.

## Estrategia de renderizado

El listado y el detalle utilizan **Server-Side Rendering (SSR)**. Cada petición obtiene los datos con `useAsyncData` y genera HTML actualizado en el servidor. Esta estrategia permite mostrar inmediatamente cambios de precio, servicios o reseñas sin reconstruir la aplicación.

El acceso al `api-server` está encapsulado en endpoints de Nitro dentro de `server/api`. De este modo, `API_BASE_URL` permanece en el servidor y las navegaciones realizadas en el cliente consumen el mismo API interno de Nuxt sin exponer configuración privada ni depender de CORS.

La búsqueda y la solicitud de reserva se hidratan en el navegador porque necesitan estado e interacción. El resto del contenido llega renderizado desde el servidor.

## Rutas

| Ruta                       | Renderizado | Descripción                        |
| -------------------------- | ----------- | ---------------------------------- |
| `/`                        | SSR         | Listado y búsqueda de alojamientos |
| `/houses/:id`              | SSR         | Detalle de una casa rural          |
| Cualquier ruta inexistente | SSR         | Página 404 personalizada           |

## Estructura

```text
.
├── assets/css/                    # Variables, reset y estilos globales
├── components/
│   ├── app/                       # Marca e iconos compartidos
│   └── houses/                    # Búsqueda, tarjetas y reserva
├── composables/                   # Acceso tipado al API interno
├── layouts/                       # Cabecera y pie compartidos
├── mock/                          # API y datos locales incluidos
├── pages/
│   ├── houses/[id].vue            # Página de detalle SSR
│   └── index.vue                  # Listado SSR
├── server/
│   ├── api/houses/                # Proxy Nitro hacia el api-server
│   └── utils/                     # Resolución del API y las imágenes
├── types/                         # Contratos de dominio
├── utils/                         # Formateadores y valoración media
├── app.vue                        # Componente raíz
├── error.vue                      # Errores y página 404
└── nuxt.config.ts                 # Configuración de Nuxt
```

Cada página y componente mantiene sus estilos en un archivo `.css` situado junto a su implementación. Las etiquetas `<style scoped src="...">` conservan el encapsulamiento de estilos de Vue sin mezclar CSS con la plantilla. `assets/css/main.css` contiene únicamente la fuente, las variables, el reset y las utilidades globales.

## Puesta en marcha

### Requisitos

- Node.js 20 o superior.
- pnpm 9.

### Instalación

1. Instala las dependencias de la aplicación:

   ```bash
   pnpm install
   ```

2. Arranca Nuxt y el API simultáneamente:

   ```bash
   pnpm dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000).

El mock está incluido en `mock/master-frontend-metaframeworks-lab/api-server` y forma parte del workspace de pnpm, por lo que no requiere ninguna instalación adicional. El propio pnpm ejecuta Nuxt y el API en paralelo, sin necesidad de un gestor de procesos adicional.

## Configuración del API

La aplicación utiliza el [`api-server` oficial de Lemoncode](https://github.com/Lemoncode/master-frontend-metaframeworks-lab/tree/main/api-server) como única fuente de datos e imágenes.

La URL predeterminada es `http://localhost:3001`. Para utilizar otra dirección, copia `.env.example` como `.env` y modifica:

```env
API_BASE_URL=http://localhost:3001
```

`API_BASE_URL` forma parte del `runtimeConfig` privado de Nuxt y solo se utiliza en el servidor. `pnpm build` no necesita que el API esté arrancado, pero sí debe estar disponible al ejecutar la aplicación y atender las peticiones.

## Scripts

| Comando          | Descripción                                      |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Arranca Nuxt y el mock API                       |
| `pnpm dev:nuxt`  | Arranca únicamente Nuxt en el puerto 3000        |
| `pnpm dev:api`   | Arranca únicamente el mock API en el puerto 3001 |
| `pnpm build`     | Genera el build de producción                    |
| `pnpm preview`   | Sirve localmente el build de producción          |
| `pnpm lint`      | Ejecuta ESLint                                   |
| `pnpm typecheck` | Comprueba TypeScript y las plantillas Vue         |

## Tecnologías

- Nuxt 4 con renderizado universal.
- Vue 3 y TypeScript.
- Nitro para los endpoints del servidor.
- `useAsyncData` para la carga SSR.
- CSS scoped externos y responsive.
- `@nuxt/image` para optimización de imágenes.
- ESLint con la configuración oficial de Nuxt.
