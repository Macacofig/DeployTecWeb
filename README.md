# ShopWave Fusion

ShopWave Fusion is an e-commerce monorepo with two apps:

- `finalproject`: Next.js frontend with customer and admin views
- `shopwavefusionbackend/shopwavefusionbackend`: Spring Boot REST API

## Mejoras Implementadas (Avance desde el 60%)

1. **Rediseño Visual Premium (Glassmorphism):** Migración a un diseño profesional, empleando blurs, paletas curadas y sistemas de grillas que mejoran la jerarquía visual.
2. **Responsividad Total (Mobile-First):** Reescritura de la arquitectura SCSS para adaptar dinámicamente pantallas, formularios, grillas y tablas complejas (con scroll horizontal) sin desbordamientos.
3. **Buscador en Tiempo Real (Live Search):** Implementación de "debouncing" para filtrar productos desde la base de datos conforme se escribe.
4. **Manejo de Estados de Interfaz:** Implementación de interfaces de carga (Skeletons/Spinners), estados vacíos profesionales, y manejo robusto de errores.
5. **Corrección de Endpoints Backend:** Resolución de colisiones de enrutamiento y soporte de insensibilidad de mayúsculas/minúsculas en consultas nativas.

## Tecnologías Utilizadas y Arquitectura

Este proyecto sigue los lineamientos de la rúbrica sobre Organización Semántica y Componentización:

- **Frontend:** Next.js (App Router), React 18, TypeScript estricto (uso de Interfaces), Etiquetas semánticas HTML5.
- **Backend:** Java 17, Spring Boot 3, Spring Security (JWT), MySQL, Maven.
- **Estilos (SASS/SCSS):** Reutilización modular bajo metodología BEM. Mezcla dinámica de breakpoints usando `@include mixins.up(md)`.
- **Cliente HTTP:** Fetch API para consumo asíncrono y nativo sin librerías externas pesadas.
- **Estado Global:** Context API para sesión (AuthContext) y compras (CartContext).
- **Persistencia:** Almacenamiento seguro mediante LocalStorage y validaciones de tokens JWT.

## Estructura del Proyecto (Project Structure)

La arquitectura del frontend sigue el principio de separación de responsabilidades (SoC):

- `src/app`: Directorio principal de App Router de Next.js. Contiene todas las páginas de la aplicación divididas lógicamente.
- `src/components/layout`: Componentes estructurales de alto nivel como `AppHeader`, `Sidebar`, y `AdminLayout`.
- `src/components/products`: Componentes específicos de dominio comercial, como `SearchBar`, `ProductFilters`, `ProductGrid`, y `ProductCard`.
- `src/components/cart`: Lógica y vista de carrito, incluyendo `CartItemCard` y resumen matemático de la compra.
- `src/components/orders`: Componentes modulares para la visualización del historial de órdenes.
- `src/components/ui`: Componentes primitivos, puros y altamente reutilizables como botones genéricos, inputs, `Modal` y tablas dinámicas (`Table.tsx`).
- `src/models`: Tipos e interfaces estandarizadas de TypeScript (ej. `Product.model.ts`, `User.model.ts`, `Order.model.ts`).
- `src/types`: Definiciones de tipos auxiliares como el estado genérico de respuestas de API (`api-response.type.ts`) y mapeo de roles.
- `src/services`: Capa de abstracción para llamadas HTTP a la API. Desacopla por completo la lógica de red de los componentes visuales de React.
- `src/hooks`: Custom hooks de React como `useAuth` y `useCart` que gestionan lógica de estado compleja y efectos secundarios.
- `src/context`: Proveedores de estado global para envolver la aplicación y evitar prop-drilling excesivo (`AuthContext.tsx`, `CartContext.tsx`).
- `src/guards`: Componentes middleware de frontend (`AuthGuard.tsx`, `AdminGuard.tsx`) para protección estricta de rutas privadas por roles.
- `src/utils`: Funciones auxiliares puras como validaciones, decodificación de tokens JWT y formateo estandarizado de monedas.
- `src/sass`: Capa de diseño modular construida con preprocesador SASS.

## Instalación y Dependencias (Requirements)

- Node.js 20+
- Java 17+
- Maven 3.8+ o el wrapper incluido en el proyecto (`mvnw`)
- Docker y Docker Compose para el entorno de contenedores
- MySQL (solo si se ejecuta en local sin Docker)

## Comandos de Instalación (Installation)

### Despliegue con Docker (Recomendado)

La manera más eficiente y libre de conflictos para inicializar la base de datos, el backend y el frontend simultáneamente:

1. Crear un archivo `.env` en el directorio raíz si aplica para variables de entorno de base de datos.
2. Ejecutar el comando para construir e inicializar los contenedores en segundo plano:

```bash
docker compose up --build -d
```

3. Verificar que los servicios han iniciado abriendo:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8081`

### Ejecución Local Manual (Sin Docker)

#### 1. Backend (Spring Boot API)

1. Ingresar a la carpeta del backend: `cd shopwavefusionbackend/shopwavefusionbackend`
2. Configurar los parámetros de conexión a tu instancia local de MySQL modificando el archivo `src/main/resources/application.properties`.
3. Compilar y ejecutar la aplicación mediante Maven Wrapper:

```bash
./mvnw clean install
./mvnw spring-boot:run
```

#### 2. Frontend (Next.js App)

1. Ingresar a la carpeta del frontend: `cd finalproject`
2. Instalar todas las dependencias definidas en `package.json`:

```bash
npm install
```

3. Generar el archivo de entorno local `.env.local` y agregar la dirección del servidor backend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081
```

4. Iniciar el servidor de desarrollo local:

```bash
npm run dev
```

*(Otros comandos útiles: `npm run build` para construir la versión optimizada de producción y `npm run start` para ejecutarla en un puerto)*.

## Endpoints Consumidos (API)

El Frontend de Next.js se conecta e interactúa con los siguientes módulos RESTful expuestos por la API de Spring Boot:

### Autenticación y Seguridad
- `POST /auth/signin`: Autenticación de usuarios. Valida credenciales y retorna un token JWT seguro.
- `POST /auth/signup`: Registro de usuarios nuevos con asignación automática de rol inicial `USER`.

### Productos e Inventario
- `GET /products`: Recuperación del catálogo público completo y filtrado avanzado (categorías, precios).
- `GET /products/{id}`: Recuperación de detalles individuales de un producto en específico.
- `GET /products/search`: Endpoint de búsqueda dinámica para el buscador en tiempo real.
- `POST /api/admin/products/`: Creación de nuevos productos en la base de datos (Solo acceso ADMIN).
- `PUT /api/admin/products/{id}`: Modificación y actualización de productos existentes (Solo acceso ADMIN).
- `DELETE /api/admin/products/{id}`: Eliminación de productos del catálogo público (Solo acceso ADMIN).

### Carrito de Compras
- `GET /api/cart/`: Obtener el carrito actual del usuario en sesión.
- `PUT /api/cart/add`: Agrega un ítem al carrito o suma cantidades validando el stock.
- `PUT /api/cart/update`: Modificar directamente las cantidades de un ítem existente.
- `DELETE /api/cart/remove`: Retirar un producto del carrito o vaciarlo completamente si es necesario.

### Órdenes y Checkout
- `POST /api/orders/`: Procesar el carrito actual, simular el checkout de compra y generar el recibo/factura final.
- `GET /api/orders/user`: Retornar el historial personal de órdenes del usuario autenticado.
- `GET /api/admin/orders/`: Retornar el historial global de todas las compras realizadas en la plataforma (Solo acceso ADMIN).

## Flujo de Navegación (Usage)

La navegación del sistema cuenta con rutas tanto públicas como estrictamente protegidas (Guards):

- `http://localhost:3000`: Página de inicio (Home) para clientes.
- `http://localhost:3000/products`: Catálogo general con búsqueda.
- `http://localhost:3000/cart`: Gestión interactiva del carrito (Requiere login).
- `http://localhost:3000/checkout`: Proceso de simulación de compra con resumen final.
- `http://localhost:3000/profile`: Perfil del usuario básico.
- `http://localhost:3000/orders`: Historial de pedidos y facturas personales.
- `http://localhost:3000/admin`: Dashboard principal de métricas (Requiere rol ADMIN).
- `http://localhost:3000/admin/products`: Lista y gestión completa (CRUD) de inventario.
- `http://localhost:3000/admin/products/create`: Módulo de creación rápida de productos.
- `http://localhost:3000/admin/orders`: Monitoreo y tabla de datos de todas las compras del negocio.

## Notas Finales y Restricciones de Negocio

- El inicio de sesión (Login) únicamente procede hacia el redireccionamiento exitoso si el Backend responde con un JWT válido y status 200.
- El sistema de registro emite confirmaciones visuales exitosas y posteriormente obliga a un inicio de sesión manual para asegurar el flujo.
- Las rutas del módulo administrativo (`/admin/*`) usan su propio layout interno independiente (`_shells.scss` y `AdminLayout`) y ocultan intencionalmente los componentes de navegación pública para garantizar una experiencia B2B completamente separada de la B2C.
- Ningún rol "USER" o visitante anónimo podrá visualizar el panel "/admin", ya que el componente `AdminGuard.tsx` verificará inmediatamente el estado del token y expulsará la solicitud, devolviendo al usuario a la pantalla de login de forma segura.