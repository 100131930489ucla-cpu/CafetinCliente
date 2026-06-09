import Cl_sMockApi from "./Cl_sMockApi.js";
export default class Cl_sProducto extends Cl_sMockApi {
    static async obtenerProductos() {
        return super.getTabla({ tabla: "producto" });
    }
    static async guardarProducto(producto) {
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
    static async eliminarProducto(codigo) {
        return super.eliminar({ tabla: "producto", codigo: codigo });
    }
}
//# sourceMappingURL=Cl_sProducto.js.map