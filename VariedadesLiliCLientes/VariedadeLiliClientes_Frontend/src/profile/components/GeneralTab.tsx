import { useQuery } from "@tanstack/react-query";
import { User, Mail, Phone, Loader2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Verifica si es @radix-ui/react-label o tu ui/label

// Logic
import { getUserProfile } from "../action/getUserProfile";
import { getStoredUserId } from "../utils/auth-storage"; // Usa la utilidad que creamos antes

export const GeneralTab = () => {

    // 1. OBTENER ID DEL LOCALSTORAGE
    const userId = getStoredUserId();

    // 2. FETCH DATA CON REACT QUERY
    const { data: cliente, isLoading, isError } = useQuery({
        queryKey: ['user-profile', userId],
        queryFn: () => getUserProfile(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutos de cache
    });

    // 3. ESTADO DE CARGA (Skeleton o Spinner)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    // 4. MANEJO DE ERROR
    if (isError || !cliente) {
        return <div className="text-red-500">Error al cargar la información del usuario.</div>;
    }

    // 5. LÓGICA PARA SEPARAR NOMBRE Y APELLIDO
    // La BD devuelve "Juan Camilo Perez", aquí intentamos separarlo
    const nombreCompleto = cliente.nombre_completo || "";
    const partesNombre = nombreCompleto.split(" ");

    // Tomamos el primer pedazo como nombre, y unimos el resto como apellido
    const primerNombre = partesNombre[0] || "";
    const apellidos = partesNombre.slice(1).join(" ") || "";

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
                            <Label htmlFor="firstName">Nombre</Label>
                            <Input
                                id="firstName"
                                defaultValue={primerNombre} // Data real
                                className="rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input
                                id="lastName"
                                defaultValue={apellidos} // Data real
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
                                    readOnly // Usualmente el email no se deja editar fácil
                                    className="pl-10 rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-100 text-slate-500 cursor-not-allowed"
                                    defaultValue={cliente.email}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="phone"
                                    className="pl-10 rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/30"
                                    defaultValue={cliente.telefono || ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:-translate-y-0.5">
                            Guardar Cambios
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};