import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserCheck } from "lucide-react"

type CustomAlertProps = {
    variantprops: "default" | "destructive",
    title: string,
    message: string,
    animation: string
}

export function CustomAlert({ variantprops, message, title, animation }: CustomAlertProps) {
    return <>
        <Alert className={animation} variant={variantprops}>
            <UserCheck className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>

    </>
}