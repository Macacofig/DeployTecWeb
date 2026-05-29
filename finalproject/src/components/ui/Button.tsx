import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "ui-button--primary",
    secondary: "ui-button--secondary",
    danger: "ui-button--danger",
    outline: "ui-button--outline",
  };

  return (
    <button
      className={`ui-button ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
}