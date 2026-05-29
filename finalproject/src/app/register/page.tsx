"use client";

import type { FormEvent } from "react";
import type { FormState } from "@/types/form-state.type";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, isAuthenticated } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <main className="auth-page"><div className="auth-status">Redirigiendo al inicio...</div></main>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFormState("submitting");

    try {
      await register({ firstName, lastName, email, mobile, password });
      setFormState("success");
      router.push("/");
    } catch (requestError) {
      setFormState("error");
      setError(requestError instanceof Error ? requestError.message : "No se pudo registrar el usuario");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <aside className="auth-panel">
          <p className="auth-panel__eyebrow">ShopWave Fusion</p>
          <h1 className="auth-panel__title">Crear cuenta</h1>
          <p className="auth-panel__lead">Prepara un onboarding limpio para usuarios nuevos con una experiencia visual más sólida y coherente con el resto de la app.</p>

          <div className="auth-benefits">
            <article className="auth-benefit">
              <p className="auth-benefit__label">Perfil</p>
              <p className="auth-benefit__value">Datos organizados</p>
              <p className="auth-benefit__text">Nombre, correo y teléfono en una sola vista clara.</p>
            </article>
            <article className="auth-benefit">
              <p className="auth-benefit__label">Acceso</p>
              <p className="auth-benefit__value">Listo para comprar</p>
              <p className="auth-benefit__text">Entra al catálogo y guarda tu sesión sin fricción.</p>
            </article>
          </div>

          <div className="auth-panel__footer">
            <span className="auth-pill">Onboarding</span>
            <span className="auth-pill">Perfil</span>
            <span className="auth-pill">Checkout</span>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="auth-form">
          <p className="auth-form__eyebrow">Registro</p>
          <h2 className="auth-form__title">Crea tu usuario</h2>
          <p className="auth-form__description">Completa tus datos para activar tu cuenta en ShopWave Fusion.</p>

          <div className="auth-fields">
            <div className="auth-field-group">
              <label className="auth-field">
                <span className="auth-label">Nombre</span>
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" className="auth-input" placeholder="Ana" />
              </label>

              <label className="auth-field">
                <span className="auth-label">Apellido</span>
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" className="auth-input" placeholder="Lopez" />
              </label>
            </div>

            <label className="auth-field">
              <span className="auth-label">Correo electrónico</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="auth-input" placeholder="correo@empresa.com" />
            </label>

            <label className="auth-field">
              <span className="auth-label">Teléfono</span>
              <input value={mobile} onChange={(event) => setMobile(event.target.value)} type="text" className="auth-input" placeholder="300 000 0000" />
            </label>

            <label className="auth-field">
              <span className="auth-label">Contraseña</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="auth-input" placeholder="********" />
            </label>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button disabled={loading || formState === "submitting"} type="submit" className="auth-button">
            Registrarme
          </button>

          <p className="auth-footnote">
            ¿Ya tienes cuenta?{" "}
            <Link className="auth-link" href="/login">
              Entrar
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}