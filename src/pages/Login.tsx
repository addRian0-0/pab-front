import { CustomAlert } from "@/components/CustomAlert";
import { LoginForm, type LoginFormsReturn } from "@/components/LoginForm";
import { useState } from "react";
import "animate.css";

export default function LoginPage() {

    const [alerta, setAlerta] = useState<LoginFormsReturn | null>(null)

    const handleLoginSuccess = (data: LoginFormsReturn) => {
        setAlerta(data)
        setTimeout(() => {
            setAlerta(prev => {
                if (!prev) return null;

                return {
                    ...prev,
                    show: false,
                };
            });
        }, 5000);
    }

    return <>
        <div className="md:flex md:flex-row md:gap-4 ">
            <h3 className="p-4 flex-[2] md:hidden flex justify-end">Login</h3>
            <h3 className="p-4 flex-[2]">Login</h3>

            <div className="p-4 flex-[1] min-h-[120px]">
                {
                    alerta && <CustomAlert
                        animation={(alerta.show ? "animate__animated animate__fadeInUp" : "animate__animated animate__fadeOut")}
                        message={alerta.message}
                        title={alerta.title}
                        variantprops={
                            alerta.estatus !== 200 ?
                                "destructive" : "default"
                        }
                    />}
            </div>
        </div>

        <div className="w-full flex justify-center items-center">
            <LoginForm onSubmitSuccess={handleLoginSuccess} />
        </div>

    </>
}