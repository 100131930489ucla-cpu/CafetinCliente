import Cl_mProducto from "../models/Cl_mProducto.js";
import Cl_sProducto from "../services/Cl_sProducto.js";
export default class Cl_cProducto {
    vista;
    onVolver;
    constructor(vista, onVolver) {
        this.vista = vista;
        this.onVolver = onVolver;
        this.vista.onAgregar(() => this.onAgregar());
        this.vista.onEliminar(() => this.onEliminar());
        this.vista.onVolver(() => this.onVolver());
        this.vista.mostrar();
        this.cargarProductos();
    }
    async cargarProductos() {
        const resultado = await Cl_sProducto.obtenerProductos();
        if (!resultado.ok) {
            alert("Error al cargar productos");
            return;
        }
        this.vista.mostrarProductos(resultado.tabla);
    }
    async onAgregar() {
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
    async onEliminar() {
        const codigo = this.vista.codigo;
        if (!codigo) {
            alert("Ingrese un código válido");
            return;
        }
        if (!confirm(`¿Eliminar producto con código ${codigo}?`))
            return;
        const resultado = await Cl_sProducto.eliminarProducto(codigo);
        alert(resultado.mensaje);
        if (resultado.ok) {
            this.vista.limpiar();
            this.cargarProductos();
        }
    }
}
//# sourceMappingURL=Cl_cProducto.js.map