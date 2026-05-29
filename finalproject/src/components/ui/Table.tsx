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
    <div className="ui-table">
      <table>
        <thead className="ui-table__head">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="ui-table__th"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="ui-table__row">
              {columns.map((col, i) => (
                <td key={i} className="ui-table__td">
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