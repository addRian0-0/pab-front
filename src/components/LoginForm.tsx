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
import { accesoUsuario } from "@/api/usuario"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  usuario: z.string().nonempty("El usuario no puede ir vacio"),
  pass: z.string().nonempty("La contraseña no puede ir vacia...")
})

export type LoginFormsReturn = {
  message: string,
  title: string,
  estatus: number,
  show?: boolean
}

type LoginFormProps = {
  onSubmitSuccess: (data: LoginFormsReturn) => void,
}

export function LoginForm({ onSubmitSuccess }: LoginFormProps) {
  // 1. Define your form.
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usuario: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await accesoUsuario({ username: values.usuario, pass: values.pass });
  
      const resAlert: LoginFormsReturn = {
        title: "Todo correcto...",
        estatus: res.status,
        message: res.data.msg,
        show: true
      }
  
      localStorage.setItem("id", res.data.id);
      onSubmitSuccess(resAlert);
  
      if (res.status === 200) {
        navigate("/inicio");
      }
  
    } catch (error: any) {
      const resAlert: LoginFormsReturn = {
        title: "Acceso denegado...",
        estatus: error.response?.status || 500,
        message: error.response?.data?.msg,
        show: true
      }
  
      onSubmitSuccess(resAlert);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su ususario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ingrese su contraseña" {...field} />
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