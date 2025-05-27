import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { columnsTablaTransacciones } from "@/util/ColumnsTablaTransacciones";
import type { Transaccion } from "@/api/types/transacciones";
import { useMemo, useState } from "react";

type TransaccionesTableProps = {
    transaccionesData: Transaccion[];
};

export function TransaccionesTable({ transaccionesData }: TransaccionesTableProps) {
    const [filtro, setFiltro] = useState<"TODAS" | "DEPOSITO" | "GANANCIA">("TODAS");

    const transaccionesFiltradas = useMemo(() => {
        if (filtro === "TODAS") return transaccionesData;
        return transaccionesData.filter(t => t.tipo_transaccion === filtro);
    }, [filtro, transaccionesData]);

    const table = useReactTable({
        data: transaccionesFiltradas,
        columns: columnsTablaTransacciones,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-medium">Transacciones - Meta</h2>

                <Select onValueChange={(value) => setFiltro(value as typeof filtro)} defaultValue={filtro}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODAS">Todas</SelectItem>
                        <SelectItem value="DEPOSITO">Depósitos</SelectItem>
                        <SelectItem value="GANANCIA">Ganancias</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="p-4">

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}
                                className={`
                                ${row.original.tipo_transaccion === "GANANCIA"
                                        ? "bg-green-500/15 "
                                        : "bg-red-500/15 "}
                                hover:bg-muted transition-colors
                              `}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
