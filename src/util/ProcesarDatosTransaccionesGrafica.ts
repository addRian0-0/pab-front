import type { Transaccion } from "@/api/types/transacciones";

export function procesarDatos(transacciones: Transaccion[]) {
    // Ordenar por fecha
    const ordenadas = [...transacciones].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const datos: { fecha: string; balance: number }[] = [];
    let balance = 0;
    let fechaActual = "";

    for (const t of ordenadas) {
        const fecha = new Date(t.createdAt).toISOString().slice(0, 10); // Solo la fecha
        const monto = t.tipo_transaccion === "DEPOSITO" ? -t.monto : t.monto;


        if (fecha !== fechaActual) {
            fechaActual = fecha;
            datos.push({ fecha, balance }); // Agregar punto del día anterior si no existía
        }

        balance += monto;
        const ultimo = datos[datos.length - 1];
        if (ultimo.fecha === fecha) {
            ultimo.balance = balance;
        } else {
            datos.push({ fecha, balance });
        }
    }

    return datos;
}
