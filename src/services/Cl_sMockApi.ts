export default class Cl_sMockApi {
    protected static apiUrl: string = "https://6a21d7eeb1d0aaf32b5002fe.mockapi.io/cafetin";

    static async getTabla({ tabla }: { tabla: string }): Promise<{
        ok: boolean;
        tabla: any[];
    }> {
        try {
            const res = await fetch(`${this.apiUrl}?tabla=${tabla}`);
            if (res.status === 404) return { ok: true, tabla: [] };
            if (!res.ok) return { ok: false, tabla: [] };
            const data = await res.json();
            return { ok: true, tabla: data };
        } catch (error) {
            return { ok: false, tabla: [] };
        }
    }

    static async post(registro: any): Promise<{ ok: boolean; mensaje: string }> {
        try {
            const res = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registro)
            });
            if (!res.ok) return { ok: false, mensaje: "Error al guardar" };
            const data = await res.json();
            return { ok: true, mensaje: "Registro guardado con ID: " + data.id };
        } catch (error) {
            return { ok: false, mensaje: "Error de conexión" };
        }
    }

    static async existeId({ tabla, id, idName }: {
        tabla: string;
        id: number;
        idName: string;
    }): Promise<{ ok: boolean; existe: boolean }> {
        try {
            const res = await fetch(`${this.apiUrl}?tabla=${tabla}&${idName}=${id}`);
            if (res.status === 404) return { ok: true, existe: false };
            if (!res.ok) return { ok: false, existe: false };
            const data = await res.json();
            return { ok: true, existe: data.length > 0 };
        } catch (error) {
            return { ok: false, existe: false };
        }
    }
static async eliminar({ tabla, codigo }: { tabla: string; codigo: number }): Promise<{ ok: boolean; mensaje: string }> {
    try {
        // 1. Buscar el producto por tabla y código
        const resBuscar = await fetch(`${this.apiUrl}?tabla=${tabla}&codigo=${codigo}`);
        
        if (resBuscar.status === 404) {
            return { ok: false, mensaje: "Registro no encontrado" };
        }
        
        if (!resBuscar.ok) {
            return { ok: false, mensaje: "Error al buscar el registro" };
        }
        
        const data = await resBuscar.json();
        
        if (!data || data.length === 0) {
            return { ok: false, mensaje: "Registro no encontrado" };
        }
        
        // 2. Obtener el ID interno de MockAPI
        const idInterno = data[0].id;
        
        // 3. Eliminar por ID interno
        const resEliminar = await fetch(`${this.apiUrl}/${idInterno}`, { method: "DELETE" });
        
        if (!resEliminar.ok) {
            return { ok: false, mensaje: "Error al eliminar" };
        }
        
        return { ok: true, mensaje: "Registro eliminado" };
    } catch (error) {
        return { ok: false, mensaje: "Error de conexión" };
    }
}

    static async modificar({ tabla, id, idName, registro }: {
        tabla: string;
        id: number;
        idName: string;
        registro: any;
    }): Promise<{ ok: boolean; mensaje: string }> {
        try {
            const existe = await this.existeId({ tabla, id, idName });
            if (!existe.ok || !existe.existe) {
                return { ok: false, mensaje: "Registro no encontrado" };
            }
            const res = await fetch(`${this.apiUrl}?tabla=${tabla}&${idName}=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registro)
            });
            if (!res.ok) return { ok: false, mensaje: "Error al modificar" };
            return { ok: true, mensaje: "Registro modificado" };
        } catch (error) {
            return { ok: false, mensaje: "Error de conexión" };
        }
    }
    static async obtenerPorId({ id }: { id: string }): Promise<{ ok: boolean; data: any }> {
        try {
            const res = await fetch(`${this.apiUrl}/${id}`);
            if (!res.ok) {
                return { ok: false, data: null };
            }
            const data = await res.json();
            return { ok: true, data: data };
        } catch (error) {
            return { ok: false, data: null };
        }
    }

    // ✅ NUEVO MÉTODO: Eliminar directamente por ID interno de MockAPI
    static async eliminarPorId({ id }: { id: string }): Promise<{ ok: boolean; mensaje: string }> {
        try {
            const res = await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
            if (!res.ok) {
                return { ok: false, mensaje: "Error al eliminar el registro" };
            }
            return { ok: true, mensaje: "Registro eliminado correctamente" };
        } catch (error) {
            return { ok: false, mensaje: "Error de conexión" };
        }
    }
    
}