"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await register({ firstName, lastName, email, mobile, password });
      router.push("/");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo registrar el usuario");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Registro</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Crear cuenta</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Estructura preparada para onboarding de usuarios con Spring Boot.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-200">
            Nombre
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="Ana" />
          </label>
          <label className="block text-sm font-medium text-slate-200">
            Apellido
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="Lopez" />
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-200">
          Correo electrónico
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="correo@empresa.com" />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-200">
          Teléfono
          <input value={mobile} onChange={(event) => setMobile(event.target.value)} type="text" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="300 000 0000" />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-200">
          Contraseña
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-400" placeholder="********" />
        </label>

        {error ? <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

        <button disabled={loading} type="submit" className="mt-6 w-full rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70">
          Registrarme
        </button>

        <p className="mt-4 text-sm text-slate-300">
          ¿Ya tienes cuenta?{" "}
          <Link className="text-brand-200 hover:text-brand-100" href="/login">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}