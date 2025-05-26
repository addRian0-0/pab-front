import { LayoutDashboard } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { getUltimaMeta } from "@/api/meta";
import type { UltimaMeta } from "@/api/types/meta";
import type { Transaccion } from "@/api/types/transacciones";
import { transaccionesUltimaMetaIDUser } from "@/api/transaccion";
import { CardData } from "@/components/CardBalance";
import { CardFechas } from "@/components/CardFechas";
import GraficaTransacciones from "@/components/GraficoTransacciones";

export default function Home() {

    const [meta, setMeta] = useState<UltimaMeta>();
    const [transacciones, setTransaccion] = useState<Transaccion[]>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUltimaMeta();
            const transaccionesUltimaMetaRes = await transaccionesUltimaMetaIDUser();
            setTransaccion(transaccionesUltimaMetaRes.data.transacciones);
            setMeta(res.data.ultimaMeta);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (meta && transacciones) {
            console.log("Meta actualizada:", meta);
            console.log("Transacciones actualizadas:", transacciones);
        }
    }, [meta, transacciones]);

    return <>
        {
            meta ?
            <>
                {/* Mobile: solo visible en pantallas pequeñas */}
                <div className="flex justify-end p-4 md:hidden">
                    <LayoutDashboard />
                    <p className="pl-2 text-xl">Dashboard</p>
                </div>

                {/* Desktop: visible desde md en adelante */}
                <div className="hidden md:flex md:flex-row md:gap-2 p-4">
                    <LayoutDashboard />
                    <p className="text-2xl">Dashboard</p>
                </div>

                <div className="p-4">
                    <p>Estadisticas sobre ultima meta asignada</p>
                </div>
                {/* <div className="p-4 md:flex md:flex-row md:gap-4"> */}
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsContent value="overview" className="space-y-4">
                            {
                                meta && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <CardData
                                        logo={true}
                                        titulo="Balance"
                                        descripcion="Balance de la meta actual"
                                        data={`${meta.balance_bank.toFixed(2)}`} />
                                    <CardData
                                        logo={true}
                                        titulo="Depositos"
                                        descripcion="Depositos realizados en el transcurso de la meta"
                                        data={`${meta.depositos_totales.toFixed(2)}`} />
                                    <CardData
                                        logo={true}
                                        titulo="Ganancias"
                                        descripcion="Ganancias totales obtenidas en el transcurso de la meta"
                                        data={`${meta.ganancias_totales.toFixed(2)}`} />

                                    <CardFechas metaData={meta} />
                                </div>
                            }
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Balance - Grafico </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        {
                                            transacciones ? <GraficaTransacciones transacciones={transacciones} />
                                            : "No hay transacciones disponibles..."
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </> : "No hay una meta en progreso"
        }


    </>
}