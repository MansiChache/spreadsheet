import { useEffect, useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Trash2 } from "lucide-react";
import { Row } from "../../types/Row";

const createEmptyRow = (): Row => ({
  id: Date.now() + Math.random(),
  jobRequest: "",
  submitted: "",
  status: "",
  submitter: "",
  url: "",
  assigned: "",
  priority: "",
  dueDate: "",
  estValue: "",
});

export default function Spreadsheet() {
  const [data, setData] = useState<Row[]>([]);
  const [extraCols, setExtraCols] = useState<string[]>([]);
  const [focusedCell, setFocusedCell] = useState<{ rowIndex: number; key: string } | null>(null);

  useEffect(() => {
    const rowHeight = 40;
    const headerHeight = 48;
    const toolbarHeight = 44;
    const viewportHeight = window.innerHeight - headerHeight - toolbarHeight;
    const rowsNeeded = Math.ceil(viewportHeight / rowHeight);
    const rows: Row[] = [];
    for (let i = 0; i < rowsNeeded; i++) {
      rows.push(createEmptyRow());
    }
    setData(rows);
  }, []);

  const handleChange = (rowIndex: number, key: string, value: string) => {
    setData((prev) => {
      const copy = [...prev];
      copy[rowIndex] = { ...copy[rowIndex], [key]: value };
      return copy;
    });
  };

  const editableKeys = Object.keys(createEmptyRow()).filter((k) => k !== "id");

  const handleFocus = useCallback((rowIndex: number, key: string) => {
    setFocusedCell((prev) => {
      if (prev?.rowIndex === rowIndex && prev?.key === key) return prev;
      return { rowIndex, key };
    });
  }, []);

  const columns: ColumnDef<Row>[] = useMemo(() => {
    const editableCols: ColumnDef<Row>[] = [...editableKeys, ...extraCols].map((key) => {
      const isExtra = extraCols.includes(key);
      return {
        header: isExtra
          ? ""
          : key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase()),
        id: key,
        cell: ({ row }: { row: any }) => {
          const isFocused = focusedCell?.rowIndex === row.index && focusedCell?.key === key;
          return (
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              value={row.original[key] ?? ""}
              autoFocus={isFocused}
              onFocus={() => handleFocus(row.index, key)}
              onChange={(e) => handleChange(row.index, key, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.stopPropagation();
                }
              }}
            />
          );
        },
      } satisfies ColumnDef<Row>;
    });

    const addColumn: ColumnDef<Row> = {
      id: "add-column",
      header: () => (
        <button
          onClick={() => setExtraCols((prev) => [...prev, `col${prev.length}`])}
          className="text-blue-500"
        >
          <Plus size={14} />
        </button>
      ),
      cell: () => null,
    };

    return [
      {
        id: "row-num",
        header: "#",
        cell: ({ row }) => {
          const isLast = row.index === data.length - 1;
          return isLast ? (
            <button
              onClick={() => setData((prev) => [...prev, createEmptyRow()])}
              className="text-blue-500"
            >
              <Plus size={14} />
            </button>
          ) : (
            row.index + 1
          );
        },
        size: 40,
      },
      ...editableCols,
      addColumn,
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={() =>
              setData((prev) => prev.filter((_, i) => i !== row.index))
            }
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        ),
        size: 40,
      },
    ];
  }, [data, extraCols, focusedCell, handleFocus]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto h-full">
      <table className="min-w-full table-fixed text-sm">
        <thead className="sticky top-0 bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} className="border px-2 py-1 text-left">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-gray-50">
              {row.getVisibleCells().map((cell) => {
                const colId = cell.column.id;
                const isEditable = editableKeys.includes(colId) || extraCols.includes(colId);
                return (
                  <td
                    key={cell.id}
                    className="border px-2 py-1 align-top"
                    onClick={() => {
                      if (isEditable) {
                        handleFocus(row.index, colId);
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
