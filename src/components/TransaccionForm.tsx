"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { agregarTransaccion } from "@/api/transaccion"

// ✅ Esquema corregido con validaciones
const formSchema = z.object({
    monto: z.coerce.number().min(1, "El monto debe ser mayor a 0"),
    transaccion: z.enum(["Deposito", "Ganancia"], {
        errorMap: () => ({ message: "Debes seleccionar una opción" })
    }),
})

export type TransaccionFormsReturn = {
    message: string,
    title: string,
    estatus: number,
    show?: boolean
}

type TransaccionFormProps = {
    onSubmitSuccess: (data: TransaccionFormsReturn) => void,
}

export function TransaccionForm({ onSubmitSuccess }: TransaccionFormProps) {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            monto: 0,
            transaccion: undefined,
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            const res = await agregarTransaccion({
                monto: values.monto,
                tipo_transaccion: values.transaccion
            })

            const resAlert: TransaccionFormsReturn = {
                title: "Todo correcto...",
                estatus: res.status,
                message: res.data.msg,
                show: true
            }

            onSubmitSuccess(resAlert)

            if (res.status === 200) {
                navigate("/inicio")
            }

        } catch (error: any) {
            const resAlert: TransaccionFormsReturn = {
                title: "Ha ocurrido un error...",
                estatus: error.response?.status || 500,
                message: error.response?.data?.msg || "Error inesperado",
                show: true
            }

            onSubmitSuccess(resAlert)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="monto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ingrese una cantidad" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="transaccion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de transacción</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione tipo de transacción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Deposito">Depósito</SelectItem>
                                        <SelectItem value="Ganancia">Ganancia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
