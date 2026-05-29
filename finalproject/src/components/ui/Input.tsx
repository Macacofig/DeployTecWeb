interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="ui-input">
      <label className="ui-input__label">
        {label}
      </label>
      <input
        className={`ui-input__control ${error ? "ui-input__control--error" : ""} ${className}`}
        {...props}
      />
      {error && <p className="ui-input__error">{error}</p>}
    </div>
  );
}