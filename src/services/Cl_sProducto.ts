import Cl_sMockApi from "./Cl_sMockApi.js";
import Cl_mProducto from "../models/Cl_mProducto.js";

export default class Cl_sProducto extends Cl_sMockApi {
    static async obtenerProductos(): Promise<{ ok: boolean; tabla: any[] }> {
        return super.getTabla({ tabla: "producto" });
    }

    static async guardarProducto(producto: Cl_mProducto): Promise<{ ok: boolean; mensaje: string }> {
        if (!producto.nombre || producto.nombre.trim() === "") {
            return { ok: false, mensaje: "El nombre es obligatorio" };
        }
        if (producto.precioUnitario <= 0) {
            return { ok: false, mensaje: "El precio debe ser mayor a 0" };
        }
        const existe = await super.existeId({ tabla: "producto", id: producto.codigo, idName: "codigo" });
        if (existe.ok && existe.existe) {
            return { ok: false, mensaje: "Ya existe un producto con ese código" };
        }
        return super.post(producto.toJSON());
    }

    static async eliminarProducto(codigo: number): Promise<{ ok: boolean; mensaje: string }> {
        return super.eliminar({ tabla: "producto", codigo: codigo });
    }
}