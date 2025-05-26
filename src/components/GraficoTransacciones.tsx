"use client"

import type { Transaccion } from "@/api/types/transacciones";
import { procesarDatos } from "@/util/ProcesarDatosTransaccionesGrafica";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function GraficaBalance({ transacciones }: { transacciones: Transaccion[] }) {
    const data = procesarDatos(transacciones);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#2d2d2d", // fondo gris oscuro
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                    }}
                    itemStyle={{
                        color: "#fff", // color del texto de cada item
                    }}
                    labelStyle={{
                        color: "#aaa", // color del label (fecha)
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="white"
                    activeDot={{
                        r: 6,
                    }}
                    strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}
