"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AuthGuard } from "../../guards/AuthGuard";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../models/user.model";
import { updateUserProfile } from "../../services/user.service";

function formatDate(value?: string) {
  if (!value) {
    return "No disponible";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getInitials(user: User) {
  const firstInitial = user.firstName?.trim().charAt(0) ?? "";
  const lastInitial = user.lastName?.trim().charAt(0) ?? "";
  return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
}

function ProfileEditor({ profile, onSaved }: { profile: User; onSaved: () => Promise<void> }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [mobile, setMobile] = useState(profile.mobile ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobile: mobile.trim(),
      });
      await onSaved();
      setSuccess("Perfil actualizado correctamente.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo actualizar tu perfil");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="surface-card admin-card profile-page__card">
      <div className="profile-page__form-header">
        <div>
          <p className="section-eyebrow">Edición</p>
          <h2 className="section-title section-title--compact">Editar datos básicos</h2>
        </div>
      </div>

      <form className="profile-page__form" onSubmit={handleSubmit}>
        <div className="profile-page__form-grid">
          <label className="ui-input">
            <span className="ui-input__label">Nombre</span>
            <input
              className="ui-input__control"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              onBlur={() => setFirstName(firstName.trim())}
              type="text"
              maxLength={30}
              required
            />
          </label>

          <label className="ui-input">
            <span className="ui-input__label">Apellido</span>
            <input
              className="ui-input__control"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onBlur={() => setLastName(lastName.trim())}
              type="text"
              maxLength={30}
              required
            />
          </label>
        </div>

        <label className="ui-input">
          <span className="ui-input__label">Teléfono</span>
          <input
            className="ui-input__control"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            onBlur={() => setMobile(mobile.trim())}
            type="tel"
            inputMode="numeric"
            maxLength={8}
            required
          />
        </label>

        <div className="profile-page__readonly-grid">
          <div className="profile-page__field">
            <span className="profile-page__label">Correo</span>
            <p className="profile-page__value">{profile.email}</p>
          </div>
          <div className="profile-page__field">
            <span className="profile-page__label">Rol</span>
            <p className="profile-page__value">{profile.role ?? "No asignado"}</p>
          </div>
        </div>

        {success ? <p className="auth-status">{success}</p> : null}
        {error ? <p className="status-banner">{error}</p> : null}

        <div className="profile-page__actions">
          <button
            type="submit"
            className="app-header__button app-header__button--solid"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ProfileContent() {
  const { user, refreshUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsRefreshing(true);
      setError(null);

      try {
        await refreshUser();
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar tu perfil");
      } finally {
        if (isMounted) {
          setIsRefreshing(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [refreshUser]);

  const profile = user;

  const profileDetails = useMemo(
    () => [
      { label: "Nombre", value: profile?.firstName ?? "No disponible" },
      { label: "Apellido", value: profile?.lastName ?? "No disponible" },
      { label: "Correo", value: profile?.email ?? "No disponible" },
      { label: "Teléfono", value: profile?.mobile ?? "No registrado" },
      { label: "Rol", value: profile?.role ?? "No asignado" },
      { label: "Usuario desde", value: formatDate(profile?.createdAt) },
    ],
    [profile]
  );

  return (
    <main className="page-shell page-shell--narrow profile-page">
      <header className="profile-page__header">
        <p className="page-header__eyebrow">Perfil</p>
        <h1 className="page-header__title">Mi perfil</h1>
        <p className="page-header__description">
          Aquí puedes ver la información recuperada de tu cuenta autenticada.
        </p>
      </header>

      {isRefreshing ? (
        <section className="surface-card admin-card">
          <p className="auth-status">Cargando datos de tu perfil...</p>
        </section>
      ) : error ? (
        <section className="surface-card admin-card profile-page__error">
          <p className="status-banner">{error}</p>
          <button type="button" className="app-header__button app-header__button--solid" onClick={() => void refreshUser()}>
            Reintentar
          </button>
        </section>
      ) : profile ? (
        <div className="profile-page__stack">
          <section className="surface-card admin-card profile-page__card">
            <div className="profile-page__summary">
              <div className="profile-page__avatar" aria-hidden="true">
                {getInitials(profile)}
              </div>

              <div className="profile-page__summary-copy">
                <p className="section-eyebrow">Cuenta activa</p>
                <h2 className="section-title section-title--compact">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="section-description">{profile.email}</p>
              </div>
            </div>

            <dl className="profile-page__details">
              {profileDetails.map((item) => (
                <div key={item.label} className="profile-page__field">
                  <dt className="profile-page__label">{item.label}</dt>
                  <dd className="profile-page__value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <ProfileEditor profile={profile} onSaved={refreshUser} />
        </div>
      ) : (
        <section className="surface-card admin-card">
          <p className="auth-status">No se encontraron datos para mostrar.</p>
        </section>
      )}
    </main>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}