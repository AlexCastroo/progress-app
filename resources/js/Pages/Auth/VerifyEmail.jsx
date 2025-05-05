import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { Button, CircularProgress } from "@mui/material";
import { CheckCircleOutline, ErrorOutline, Email } from "@mui/icons-material";
import './../../../css/Auth.css';

const VerifyEmail = () => {
    // Extraer parámetros manualmente
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    const hash = query.get("hash");
    const expires = query.get("expires");
    const signature = query.get("signature");

    const [status, setStatus] = useState("loading"); // loading, success, error
    const [message, setMessage] = useState("");
    const [resendStatus, setResendStatus] = useState(""); // success, error, ""

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!id || !hash || !expires || !signature) {
                    setStatus("error");
                    setMessage("Faltan parámetros en la URL. El enlace parece estar incompleto.");
                    return;
                }

                const response = await axios.post(
                    `/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`,
                    { withCredentials: true }
                )

                console.log("Email verificado:", response.data);
                setStatus("success");
                setMessage("Tu correo electrónico ha sido verificado exitosamente.");
                
                // Redireccionar después de 3 segundos
                setTimeout(() => {
                    Inertia.visit('projects');
                }, 3000);

            } catch (error) {
                console.error("Error verificando email:", error);
                setStatus("error");
                setMessage(error.response?.data?.message || "Error al verificar el correo electrónico. El enlace puede haber expirado.");
            }
        };

        verifyEmail();
    }, [id, hash, expires, signature]);

    const resendEmailVerification = () => {
        setResendStatus("");
        axios.post('/api/resend-email-verify')
            .then((response) => {
                console.log('Email verification resent', response.data);
                setResendStatus("success");
            })
            .catch((error) => {
                console.error('Error resending email verification', error.response?.data || error.message);
                setResendStatus("error");
            });
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Verificación de correo</h1>
                    <p className="auth-subtitle">Confirmando tu dirección de correo electrónico</p>
                </div>
                
                <div className="auth-form text-center py-6">
                    {status === "loading" && (
                        <div className="flex flex-col items-center justify-center p-6">
                            <CircularProgress color="primary" size={60} />
                            <p className="mt-4 text-gray-600">Verificando tu correo electrónico...</p>
                        </div>
                    )}
                    
                    {status === "success" && (
                        <div className="flex flex-col items-center justify-center p-6">
                            <CheckCircleOutline style={{ fontSize: 60, color: '#10b981' }} />
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">¡Verificación exitosa!</h2>
                            <p className="mt-2 text-gray-600">{message}</p>
                            <p className="mt-4 text-sm text-gray-500">Serás redirigido automáticamente...</p>
                        </div>
                    )}
                    
                    {status === "error" && (
                        <div className="flex flex-col items-center justify-center p-6">
                            <ErrorOutline style={{ fontSize: 60, color: '#ef4444' }} />
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">Error de verificación</h2>
                            <p className="mt-2 text-gray-600">{message}</p>
                            
                            <div className="mt-6">
                                <Button
                                    onClick={resendEmailVerification}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Email />}
                                    className="auth-button-primary"
                                    disableElevation
                                >
                                    Reenviar correo de verificación
                                </Button>
                                
                                {resendStatus === "success" && (
                                    <p className="mt-2 text-sm text-green-600">Correo de verificación enviado correctamente.</p>
                                )}
                                
                                {resendStatus === "error" && (
                                    <p className="mt-2 text-sm text-red-600">Error al enviar el correo de verificación. Intenta más tarde.</p>
                                )}
                            </div>
                            
                            <div className="mt-4">
                                <a href="/login" className="auth-link">Volver al inicio de sesión</a>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="auth-footer">
                    <p className="logo-text text-blue-600">Task<span className="text-indigo-600">Manager</span></p>
                    <p className="mt-1">Tu segunda mente para gestionar tareas</p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
