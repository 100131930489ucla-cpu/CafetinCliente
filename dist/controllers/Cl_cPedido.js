import Cl_mProducto from "../models/Cl_mProducto.js";
import Cl_mPedido from "../models/Cl_mPedido.js";
import Cl_sPedido from "../services/Cl_sPedido.js";
import Cl_sProducto from "../services/Cl_sProducto.js";
export default class Cl_cPedido {
    vista;
    pedidoActual;
    productosDisponibles = [];
    constructor(vista) {
        this.vista = vista;
        this.pedidoActual = new Cl_mPedido({
            nombreCliente: "",
            tipoPago: "",
            productos: []
        });
        this.vista.onAgregarProducto(() => this.onAgregarProducto());
        this.vista.onEliminarProducto((codigo) => this.onEliminarProducto(codigo));
        this.vista.onGuardar(() => this.onGuardar());
        this.cargarProductos();
    }
    async cargarProductos() {
        const resultado = await Cl_sProducto.obtenerProductos();
        if (resultado.ok) {
            this.productosDisponibles = resultado.tabla.map((p) => new Cl_mProducto(p));
            this.vista.cargarProductosDisponibles(this.productosDisponibles);
        }
    }
    onAgregarProducto() {
        const codigo = this.vista.codigoProducto;
        const cantidad = this.vista.cantidad;
        if (!codigo || cantidad <= 0) {
            alert("Seleccione un producto y cantidad válida");
            return;
        }
        const productoBase = this.productosDisponibles.find(p => p.codigo === codigo);
        if (!productoBase) {
            alert("Producto no encontrado");
            return;
        }
        const productoPedido = new Cl_mProducto({
            codigo: productoBase.codigo,
            nombre: productoBase.nombre,
            cantidad: cantidad,
            precioUnitario: productoBase.precioUnitario
        });
        this.pedidoActual.agregarProducto(productoPedido);
        this.actualizarListaProductos();
        this.vista.limpiarProductoInput();
    }
    onEliminarProducto(codigo) {
        this.pedidoActual.eliminarProducto(codigo);
        this.actualizarListaProductos();
    }
    actualizarListaProductos() {
        const productos = this.pedidoActual.getProductos();
        const items = productos.map(p => ({
            codigo: p.codigo,
            nombre: p.nombre,
            cantidad: p.cantidad,
            precioUnitario: p.precioUnitario,
            subtotal: p.subtotal()
        }));
        this.vista.mostrarProductosSeleccionados(items);
        this.vista.actualizarTotalPedido(this.pedidoActual.total());
    }
    async onGuardar() {
        const nombreCliente = this.vista.nombreCliente;
        const tipoPago = this.vista.tipoPago;
        this.pedidoActual.nombreCliente = nombreCliente;
        this.pedidoActual.tipoPago = tipoPago;
        const resultado = await Cl_sPedido.guardarPedido(this.pedidoActual);
        alert(resultado.mensaje);
        if (resultado.ok) {
            this.pedidoActual = new Cl_mPedido({
                nombreCliente: "",
                tipoPago: "",
                productos: []
            });
            this.actualizarListaProductos();
            this.vista.limpiar();
        }
    }
}
//# sourceMappingURL=Cl_cPedido.js.map