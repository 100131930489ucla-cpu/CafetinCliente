import I_vProducto  from "../interfaces/I_vProducto.js";
import Cl_mProducto from "../models/Cl_mProducto.js";
import Cl_sProducto from "../services/Cl_sProducto.js";

export default class Cl_cProducto {
    private vista: I_vProducto;
    private onVolver: () => void;

    constructor(vista: I_vProducto, onVolver: () => void) {
    this.vista = vista;
    this.onVolver = onVolver;
    this.vista.onAgregar(() => this.onAgregar());
    this.vista.onEliminar(() => this.onEliminar());
    this.vista.onVolver(() => this.onVolver());
    this.vista.mostrar();
    this.cargarProductos();
    }

    private async cargarProductos(): Promise<void> {
        const resultado = await Cl_sProducto.obtenerProductos();
        if (!resultado.ok) {
            alert("Error al cargar productos");
            return;
        }
        this.vista.mostrarProductos(resultado.tabla);
    }

    private async onAgregar(): Promise<void> {
        const producto = new Cl_mProducto({
            codigo: this.vista.codigo,
            nombre: this.vista.nombre,
            cantidad: 0,
            precioUnitario: this.vista.precioUnitario
        });
        const resultado = await Cl_sProducto.guardarProducto(producto);
        alert(resultado.mensaje);
        if (resultado.ok) {
            this.vista.limpiar();
            this.cargarProductos();
        }
    }

    private async onEliminar(): Promise<void> {
        const codigo = this.vista.codigo;
        if (!codigo) {
            alert("Ingrese un código válido");
            return;
        }
        if (!confirm(`¿Eliminar producto con código ${codigo}?`)) return;
        const resultado = await Cl_sProducto.eliminarProducto(codigo);
        alert(resultado.mensaje);
        if (resultado.ok) {
            this.vista.limpiar();
            this.cargarProductos();
        }
    }
}