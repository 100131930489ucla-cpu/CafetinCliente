import Cl_sMockApi from "./Cl_sMockApi.js";
import Cl_mPedido from "../models/Cl_mPedido.js";

export default class Cl_sPedido extends Cl_sMockApi {
    static async obtenerPedidos(): Promise<{ ok: boolean; tabla: any[] }> {
        return super.getTabla({ tabla: "pedido" });
    }

    static async guardarPedido(pedido: Cl_mPedido): Promise<{ ok: boolean; mensaje: string }> {
        if (!pedido.nombreCliente || pedido.nombreCliente.trim() === "") {
            return { ok: false, mensaje: "El nombre del cliente es obligatorio" };
        }
        if (!pedido.tipoPago || pedido.tipoPago.trim() === "") {
            return { ok: false, mensaje: "El tipo de pago es obligatorio" };
        }
        if (pedido.getProductos().length === 0) {
            return { ok: false, mensaje: "Debe agregar al menos un producto" };
        }
        return super.post(pedido.toJSON());
    }

    // ✅ NUEVO MÉTODO: Procesar (eliminar) un pedido por su ID
    static async procesarPedido(id: string): Promise<{ ok: boolean; mensaje: string }> {
        // 1. Obtener el registro por ID
        const registro = await super.obtenerPorId({ id });
        if (!registro.ok) {
            return { ok: false, mensaje: "No se encontró el registro" };
        }
        
        // 2. Verificar que sea un pedido
        if (registro.data.tabla !== "pedido") {
            return { ok: false, mensaje: "El ID no corresponde a un pedido" };
        }
        
        // 3. Eliminar el pedido
        return super.eliminarPorId({ id });
    }
}