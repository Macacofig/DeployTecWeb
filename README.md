# ShopWave Fusion

ShopWave Fusion is an e-commerce monorepo with two apps:

- `finalproject`: Next.js frontend with customer and admin views
- `shopwavefusionbackend/shopwavefusionbackend`: Spring Boot REST API

## Project Structure

- `finalproject`: storefront, auth pages, cart, checkout, profile, and admin panel
- `shopwavefusionbackend/shopwavefusionbackend`: authentication, products, orders, and cart API
- `docker-compose.yml`: local full-stack startup with database

## Requirements

- Node.js 20+
- Java 17+
- Maven 3.8+ or the included wrapper
- Docker and Docker Compose for containerized setup

## Installation

### With Docker

1. Create the required `.env` files.
2. Run:

```bash
docker compose up --build
```

3. Open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`

### Without Docker

#### Backend

1. Enter `shopwavefusionbackend/shopwavefusionbackend`.
2. Configure database settings in `src/main/resources/application.properties`.
3. Run:

```bash
./mvnw spring-boot:run
```

#### Frontend

1. Enter `finalproject`.
2. Install dependencies:

```bash
npm install
```

3. Add the API URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081
```

4. Start the app:

```bash
npm run dev
```

## Usage

- `http://localhost:3000`: customer home, catalog, cart, checkout, profile, and orders
- `http://localhost:3000/admin`: admin dashboard
- `http://localhost:3000/admin/products`: product management
- `http://localhost:3000/admin/products/create`: create products

## Frontend Components

- `src/app`: route pages and layouts
- `src/components/layout`: header, hero, admin shell, and route gate
- `src/components/products`: search, filters, grid, and product cards
- `src/components/cart`: cart item and summary components
- `src/components/orders`: order cards
- `src/components/ui`: reusable button, input, modal, and table primitives
- `src/context`: auth and cart state
- `src/guards`: public/admin access control
- `src/services`: API calls for auth, products, orders, users, and cart
- `src/sass`: modular Sass styles split by layout, pages, and components
- `src/types`: shared project types

## Notes

- Login only succeeds when the backend returns a JWT token.
- Registration shows a success state and then sends the user to login.
- Admin routes use their own shell and should not show customer navbar links.
- Protected routes include cart, checkout, profile, orders, and admin.
