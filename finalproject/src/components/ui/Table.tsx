import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="min-w-full bg-slate-800">
        <thead className="bg-slate-700">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-slate-750">
              {columns.map((col, i) => (
                <td key={i} className="px-6 py-4 text-sm text-slate-200">
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : String(item[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}