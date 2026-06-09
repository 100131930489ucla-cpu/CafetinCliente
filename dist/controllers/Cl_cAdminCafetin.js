import { Cl_mPedido } from "../models/Cl_mPedido.js";
export class Cl_cAdminCafetin {
    vista;
    constructor(vista) {
        this.vista = vista;
        // Vincula el botón a la acción del controlador
        this.vista.escucharBotonGuardar(() => this.procesarGuardado());
    }
    async procesarGuardado() {
        try {
            const nuevoPedido = this.vista.obtenerDatosFormulario();
            await Cl_mPedido.guardar(nuevoPedido);
            this.vista.limpiarFormulario();
        }
        catch (error) {
            console.error(error);
            alert("Error de red: No se pudo enviar el pedido.");
        }
    }
}
//# sourceMappingURL=Cl_cAdminCafetin.js.map