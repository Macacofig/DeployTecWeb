# Frontend - ShopWave Fusion

Web UI for ShopWave Fusion built with Next.js App Router, React, TypeScript, and Sass.

## Stack

- Next.js 16
- React 19
- TypeScript
- Axios
- Modular Sass
- Context API for auth and cart state
- Route guards for protected views

## Installation

1. Enter the frontend folder:

```bash
cd finalproject
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081
```

4. Start development:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Usage

- Home and catalog: browse products and categories
- Auth: register and login with backend session validation
- Cart and checkout: manage purchases
- Profile and orders: review your account activity
- Admin: manage products and orders from `/admin`

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run the build
- `npm run lint`: run ESLint
- `npm run watch:sass`: watch Sass changes

## Frontend Components

- `src/app`: routes and layouts
- `src/components/layout`: shared shells, header, hero, and admin layout
- `src/components/products`: catalog UI
- `src/components/cart`: cart UI
- `src/components/orders`: order cards
- `src/components/ui`: buttons, inputs, modals, and tables
- `src/context`: auth and cart providers
- `src/guards`: access control
- `src/services`: API layer
- `src/sass`: global, layout, page, and component styles
- `src/types`: shared TypeScript types

## Behavior

- Guest users cannot enter protected routes.
- Login only succeeds when the backend returns a JWT token.
- Registration shows a success state and redirects to login.
- Admin users use a dedicated admin shell without customer navbar links.