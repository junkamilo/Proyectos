import { LogOut, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Definimos la interfaz de lo que este componente NECESITA para vivir
interface ProfileCardProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
        initials: string;
        tier: string;
        isActive: boolean;
        stats: {
            orders: number;
            memberSince: string;
        };
    };
    onLogout: () => void;
}

export const ProfileCard = ({ user, onLogout }: ProfileCardProps) => {
    return (
        <aside className="sticky top-24 space-y-6">
            <Card className="border-none shadow-2xl shadow-stone-200/50 dark:shadow-none rounded-[2rem] overflow-hidden bg-white dark:bg-slate-950 relative group">
                {/* ... Fondo ... */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

                <CardContent className="p-0">
                    {/* Header */}
                    <div className="h-40 bg-gradient-to-br from-emerald-800 via-teal-700 to-emerald-900 relative overflow-hidden">
                        {/* ... Decoraciones ... */}
                        <div className="absolute top-5 right-5">
                            <Badge className="bg-white/20 text-white border-none backdrop-blur-md px-3 py-1.5">
                                <Sparkles className="w-3 h-3 mr-2 text-yellow-300 fill-yellow-300" />
                                {user.tier}
                            </Badge>
                        </div>
                    </div>

                    <div className="px-6 relative">
                        {/* Avatar */}
                        <div className="-mt-16 mb-4 flex justify-center">
                            <div className="relative group/avatar">
                                <Avatar className="h-32 w-32 border-[6px] border-white dark:border-slate-950 shadow-xl bg-white">

                                    {/* 1. Intenta mostrar la URL que calculamos con tu lógica */}
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                        className="object-cover"
                                    />

                                    {/* 2. Si falla o no hay foto, muestra esto (Tus iniciales con fondo verde) */}
                                    {/* Esto reemplaza a tu "ui-avatars.com" porque es nativo y más rápido */}
                                    <AvatarFallback className="text-4xl font-bold bg-emerald-100 text-emerald-800 flex items-center justify-center w-full h-full">
                                        {user.initials}
                                    </AvatarFallback>

                                </Avatar>
                                <Button size="icon" className="absolute bottom-1 right-1 rounded-full h-10 w-10 shadow-lg border-4 border-white dark:border-slate-950 bg-slate-900 hover:bg-emerald-600 text-white transition-all hover:scale-110">
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center space-y-1 mb-8">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{user.email}</p>
                            <div className="flex justify-center mt-2">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {user.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <StatBox value={user.stats.orders} label="Pedidos" color="blue" />
                            <StatBox value={user.stats.memberSince} label="Desde" color="amber" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <nav className="space-y-2">
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start gap-3 h-14 px-5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-2xl border border-transparent hover:border-rose-100 transition-all">
                    <div className="p-2 bg-rose-50 rounded-xl"><LogOut className="w-5 h-5" /></div>
                    <span className="font-medium">Cerrar Sesión</span>
                </Button>
            </nav>
        </aside>
    );
};

// Pequeño componente helper local para no repetir código
const StatBox = ({ value, label, color }: { value: string | number, label: string, color: 'blue' | 'amber' }) => {
    const colors = {
        blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
        amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20"
    };
    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl cursor-default ${colors[color]}`}>
            <span className="text-lg font-bold">{value}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70 text-center">{label}</span>
        </div>
    );
};