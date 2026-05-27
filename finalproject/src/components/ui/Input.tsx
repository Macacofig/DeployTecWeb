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
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 bg-slate-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-200 ${
          error ? "border-red-500" : "border-slate-600"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}