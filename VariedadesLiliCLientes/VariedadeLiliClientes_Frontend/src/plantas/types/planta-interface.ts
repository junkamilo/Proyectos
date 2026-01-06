// 1. LO QUE VIENE DEL BACKEND (Tu interfaz Producto actual)
export interface Producto {
    id_producto: number;
    nombre_producto: string;
    url_foto_producto: string;
    cantidad: number;
    descripcion: string;
    precio: string;
    tamano: string; 
    categoria: string;
    material: string;
    estado: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

//esto es lo que usa el frontend
export interface ProductPlanta {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    description: string;
    category: string;
    tamano: string;
    material: string;
    isNew: boolean;
    inStock: number;
}