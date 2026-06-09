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

    // ✅ NUEVO MÉTODO: Obtener porcentaje de solicitudes por producto
    static async obtenerPorcentajesProductos(): Promise<{ ok: boolean; tabla: any[] }> {
        const pedidosRes = await this.obtenerPedidos();
        if (!pedidosRes.ok) return { ok: false, tabla: [] };

        const pedidos = pedidosRes.tabla || [];
        const conteo: Record<number, number> = {};
        let totalVeces = 0;

        for (let i = 0; i < pedidos.length; i++) {
            const p = pedidos[i];
            if (!p.productos || !Array.isArray(p.productos)) continue;
            for (let j = 0; j < p.productos.length; j++) {
                const prod = p.productos[j];
                const codigo = prod.codigo || prod.codigoProducto || 0;
                const cantidad = Number(prod.cantidad) || 0;
                if (!conteo[codigo]) conteo[codigo] = 0;
                conteo[codigo] += cantidad;
                totalVeces += cantidad;
            }
        }

        const tabla: any[] = [];
        for (const key in conteo) {
            const codigo = parseInt(key);
            const veces = conteo[codigo] || 0;
            const porcentaje = totalVeces > 0 ? (veces / totalVeces) * 100 : 0;
            tabla.push({ codigo, veces, porcentaje });
        }

        return { ok: true, tabla };
    }
}