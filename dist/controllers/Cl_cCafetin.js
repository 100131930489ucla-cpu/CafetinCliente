import Cl_mCafetin from "../models/Cl_mCafetin.js";
import Cl_sPedido from "../services/Cl_sPedido.js";
export default class Cl_cCafetin {
    vista;
    modelo;
    onVolver;
    constructor(vista, onVolver) {
        this.vista = vista;
        this.modelo = new Cl_mCafetin();
        this.onVolver = onVolver;
        this.vista.onRecargar(() => this.cargarPantalla());
        this.vista.onVolver(() => this.onVolver());
        this.vista.onProcesarPedido((id) => this.procesarPedido(id)); // ← NUEVO
        this.vista.mostrar();
        this.cargarPantalla();
    }
    async cargarPantalla() {
        const resultado = await Cl_sPedido.obtenerPedidos();
        if (!resultado.ok) {
            this.vista.mostrarError();
            return;
        }
        // Guardar en el modelo (sin IDs)
        this.modelo.setPedidos(resultado.tabla);
        // Pasar los datos crudos (con ID) a la vista
        this.vista.mostrarPedidos(resultado.tabla);
        this.vista.mostrarEstadisticas({
            totalGeneral: this.modelo.totalGeneral(),
            cantidadPedidos: this.modelo.cantidadPedidos()
        });
    }
    // ✅ NUEVO MÉTODO: Procesar (eliminar) pedido
    async procesarPedido(id) {
        if (!id || id.trim() === "") {
            alert("Ingrese un ID de pedido válido");
            return;
        }
        if (!confirm(`¿Procesar (eliminar) el pedido con ID ${id}?`))
            return;
        const resultado = await Cl_sPedido.procesarPedido(id);
        alert(resultado.mensaje);
        if (resultado.ok) {
            await this.cargarPantalla();
        }
    }
}
//# sourceMappingURL=Cl_cCafetin.js.map