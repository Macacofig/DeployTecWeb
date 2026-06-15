"use client";

import type { FormEvent } from "react";
import type { FormState } from "@/types/form-state.type";
import type { UserRole } from "@/types/role.type";
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
  const [formState, setFormState] = useState<FormState>("idle");
  const ADMIN_ROLE: UserRole = "ROLE_ADMIN";

  useEffect(() => {
    if (isAuthenticated) {
      const target = user?.role === ADMIN_ROLE ? "/admin" : "/";
      router.replace(target);
    }
  }, [isAuthenticated, user?.role, router]);

  if (isAuthenticated) {
    return <main className="auth-page"><div className="auth-status">Redirigiendo al inicio...</div></main>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFormState("submitting");

    try {
      const session = await signIn({ email, password });

      if (!session.token) {
        throw new Error("La contraseña no es válida o la sesión no pudo iniciarse.");
      }

      setFormState("success");
      router.push(session.user.role === ADMIN_ROLE ? "/admin" : "/");
    } catch (requestError) {
      setFormState("error");
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <aside className="auth-panel">
          <p className="auth-panel__eyebrow">ShopWave Fusion</p>
          <h1 className="auth-panel__title">Iniciar sesión</h1>
          <p className="auth-panel__lead">Conecta tu sesión y accede al catálogo, pedidos y perfil desde una interfaz más clara y con más presencia visual.</p>

          <div className="auth-benefits">
            <article className="auth-benefit">
              <p className="auth-benefit__label">Sesión</p>
              <p className="auth-benefit__value">Segura y persistente</p>
              <p className="auth-benefit__text">JWT mantenido en el frontend para volver sin fricción.</p>
            </article>
            <article className="auth-benefit">
              <p className="auth-benefit__label">Panel</p>
              <p className="auth-benefit__value">Acceso rápido</p>
              <p className="auth-benefit__text">Entra directo a tus módulos según tu rol.</p>
            </article>
          </div>

          <div className="auth-panel__footer">
            <span className="auth-pill">Catálogo</span>
            <span className="auth-pill">Pedidos</span>
            <span className="auth-pill">Perfil</span>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="auth-form">
          <p className="auth-form__eyebrow">Acceso</p>
          <h2 className="auth-form__title">Bienvenido de nuevo</h2>
          <p className="auth-form__description">Ingresa tus credenciales para continuar en ShopWave Fusion.</p>

          <div className="auth-fields">
            <label className="auth-field">
              <span className="auth-label">Correo electrónico</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="auth-input" placeholder="correo@empresa.com" />
            </label>

            <label className="auth-field">
              <span className="auth-label">Contraseña</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="auth-input" placeholder="********" />
            </label>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button disabled={loading || formState === "submitting"} type="submit" className="auth-button">
            Entrar
          </button>

          <p className="auth-footnote">
            ¿No tienes cuenta?{" "}
            <Link className="auth-link" href="/register">
              Crear usuario
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}