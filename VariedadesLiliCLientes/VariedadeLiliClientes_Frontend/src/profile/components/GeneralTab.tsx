import { User, Mail, Phone, Loader2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeneralProfile } from "../hooks/useGeneralProfile";


export const GeneralTab = () => {
    // Toda la lógica vive aquí 👇
    const {
        formData,
        email,
        isLoading,
        isError,
        isSaving,
        handleChange,
        handleSave
    } = useGeneralProfile();

    // Renderizados condicionales simples
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Error al cargar la información del usuario.</div>;
    }

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-800/20 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" /> Información Personal
                    </CardTitle>
                    <CardDescription>Actualiza tus datos básicos de contacto</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    {/* FILA 1: NOMBRE Y APELLIDO */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input
                                id="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className="rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/30"
                            />
                        </div>
                    </div>

                    {/* FILA 2: EMAIL Y TELÉFONO */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="email"
                                    readOnly
                                    value={email}
                                    className="pl-10 rounded-xl border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="pl-10 rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/30"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:-translate-y-0.5 disabled:opacity-70"
                        >
                            {isSaving ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</>
                            ) : (
                                "Guardar Cambios"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};