import type { ColumnDef } from "@tanstack/react-table";
import type { Transaccion } from "@/api/types/transacciones";

export const columnsTablaTransacciones: ColumnDef<Transaccion>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toISOString().slice(0, 10),
  },
  {
    accessorKey: "tipo_transaccion",
    header: "Tipo",
    cell: ({ row }) => row.getValue("tipo_transaccion") === "DEPOSITO" ? "Deposito": "Ganancia"
  },
  {
    accessorKey: "monto",
    header: "Monto",
    cell: ({ row }) => `$${row.getValue("monto")}`,
  }
];
