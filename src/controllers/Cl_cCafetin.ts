import I_vCafetin from "../interfaces/I_vCafetin.js";
import Cl_mCafetin from "../models/Cl_mCafetin.js";
import Cl_sPedido from "../services/Cl_sPedido.js";

export default class Cl_cCafetin {
    private vista: I_vCafetin;
    private modelo: Cl_mCafetin;
    private onVolver: () => void;

    constructor(vista: I_vCafetin, onVolver: () => void) {
        this.vista = vista;
        this.modelo = new Cl_mCafetin();
        this.onVolver = onVolver;
        this.vista.onRecargar(() => this.cargarPantalla());
        this.vista.onVolver(() => this.onVolver());
        this.vista.onProcesarPedido((id: string) => this.procesarPedido(id));  // ← NUEVO
        this.vista.mostrar();
        this.cargarPantalla();
    }

    private async cargarPantalla(): Promise<void> {
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
    private async procesarPedido(id: string): Promise<void> {
        if (!id || id.trim() === "") {
            alert("Ingrese un ID de pedido válido");
            return;
        }
        
        if (!confirm(`¿Procesar (eliminar) el pedido con ID ${id}?`)) return;
        
        const resultado = await Cl_sPedido.procesarPedido(id);
        alert(resultado.mensaje);
        
        if (resultado.ok) {
            await this.cargarPantalla();
        }
    }
}