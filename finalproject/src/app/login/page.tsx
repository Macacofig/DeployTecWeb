"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const target = user?.role === "ROLE_ADMIN" ? "/admin" : "/";
      router.replace(target);
    }
  }, [isAuthenticated, user?.role, router]);

  if (isAuthenticated) {
    return <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12 text-slate-300">Redirigiendo al inicio...</main>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const session = await signIn({ email, password });

      if (!session.token) {
        throw new Error("La contraseña no es válida o la sesión no pudo iniciarse.");
      }

      router.push(session.user.role === "ROLE_ADMIN" ? "/admin" : "/");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Acceso</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Iniciar sesión</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Conecta el JWT emitido por Spring Boot y conserva la sesión en el frontend.</p>

        <label className="mt-6 block text-sm font-medium text-slate-200">
          Correo electrónico
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-brand-400" placeholder="correo@empresa.com" />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-200">
          Contraseña
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="********" />
        </label>

        {error ? <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

        <button disabled={loading} type="submit" className="mt-6 w-full rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70">
          Entrar
        </button>

        <p className="mt-4 text-sm text-slate-300">
          ¿No tienes cuenta?{" "}
          <Link className="text-brand-200 hover:text-brand-100" href="/register">
            Crear usuario
          </Link>
        </p>
      </form>
    </main>
  );
}