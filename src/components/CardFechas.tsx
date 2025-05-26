import type { UltimaMeta } from "@/api/types/meta"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type CardFechasProps = {
    metaData: UltimaMeta
}

export function CardFechas({ metaData }: CardFechasProps) {

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tiempos a cumplir
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="font-bold">Fecha de creación:</div>
                        <p className="text-muted-foreground">
                            {new Date(metaData.createdAt).toISOString().slice(0, 10)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm mt-2">
                        <div className="font-bold">Fecha límite:</div>
                        <p className="text-muted-foreground">
                            {new Date(metaData.fecha_limite).toISOString().slice(0, 10)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm mt-2">
                        <div className="font-bold">Tiempo restante:</div>
                        <p className="text-muted-foreground">{metaData.tiempo_limite}</p>
                    </div>

                </CardContent>
            </Card>
        </>
    );

}