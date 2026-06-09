import { Cl_mPedido } from "../models/Cl_mPedido.js";
export class Cl_cCocinaCafetin {
    vista;
    constructor(vista) {
        this.vista = vista;
        this.cargarPantalla();
    }
    async cargarPantalla() {
        try {
            const listaPedidos = await Cl_mPedido.obtenerTodos();
            this.vista.mostrarPedidos(listaPedidos);
        }
        catch (error) {
            console.error(error);
            const tabla = document.getElementById("tablaPedidos");
            if (tabla) {
                tabla.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Error al cargar datos desde la nube.</td></tr>`;
            }
        }
    }
}
//# sourceMappingURL=Cl_cCocinaCafetin.js.map