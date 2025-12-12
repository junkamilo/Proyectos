export interface ProductoAbono {
    id_producto: number;
    nombre_producto: string;
    url_foto_producto: string;
    cantidad: number;
    descripcion: string;
    precio: string; // Viene como string en tu JSON ("9999.98")
    tamano: string; // Podrías usar 'grande' | 'mediano' | 'pequeño' si son fijos
    categoria: string;
    material: string;
    estado: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}