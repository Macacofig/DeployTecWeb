This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Installation Notes

The frontend dependencies are declared in `finalproject/package.json` and locked in `finalproject/package-lock.json`. They include `next`, `react`, `react-dom`, `axios`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, and the ESLint packages listed there.

When you run `docker compose up --build`, Docker installs those dependencies inside the image, so you do not need to install them globally on your machine just to run the project in Docker.

The local installs that were redundant were the `node_modules` folders on your machine and the root-level npm setup, because the frontend Docker build does not use the root `package.json`.

If you run the app locally without Docker, install the frontend dependencies inside `finalproject` with `npm install` and then use `npm run dev`.

## Project Notes

This frontend talks to the backend at `http://localhost:8081` by default. The active environment variables are:

- `NEXT_PUBLIC_API_URL=http://localhost:8081`
- `FRONTEND_URL=http://localhost:3000`

When running with Docker Compose, the frontend build receives `NEXT_PUBLIC_API_URL` as a build argument, so the browser points to the correct backend port.

The authentication flow no longer allows guest access.

- If there is no valid session, the app redirects to `/login`.
- The login only succeeds when the backend returns a token.
- If the password is incorrect, the session is not created and the user stays on the login page.

Protected routes require an authenticated session:

- `/cart`
- `/checkout`
- `/profile`
- `/orders`
- `/admin`

The header is shown only for authenticated users, and the home page adapts to the session state.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.