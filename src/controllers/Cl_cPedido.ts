import I_vPedido  from "../interfaces/I_vPedido.js";
import Cl_mProducto from "../models/Cl_mProducto.js";
import Cl_mPedido from "../models/Cl_mPedido.js";
import Cl_sPedido from "../services/Cl_sPedido.js";
import Cl_sProducto from "../services/Cl_sProducto.js";

export default class Cl_cPedido {
    private vista: I_vPedido;
    private pedidoActual: Cl_mPedido;
    private productosDisponibles: Cl_mProducto[] = [];

    constructor(vista: I_vPedido) {
        this.vista = vista;
        this.pedidoActual = new Cl_mPedido({
            nombreCliente: "",
            tipoPago: "",
            productos: []
        });
        this.vista.onAgregarProducto(() => this.onAgregarProducto());
        this.vista.onEliminarProducto((codigo: number) => this.onEliminarProducto(codigo));
        this.vista.onGuardar(() => this.onGuardar());
        this.cargarProductos();
        this.vista.onProductoSeleccionado((codigo: number) => this.actualizarPorcentajeProducto(codigo));
    }

    private async actualizarPorcentajeProducto(codigo: number): Promise<void> {
        try {
            const res = await Cl_sPedido.obtenerPorcentajesProductos();
            if (!res.ok) {
                this.vista.mostrarPorcentajeProducto(0);
                return;
            }
            const tabla = res.tabla || [];
            const item = tabla.find((t: any) => t.codigo === codigo);
            const porcentaje = item ? Number(item.porcentaje) : 0;
            this.vista.mostrarPorcentajeProducto(porcentaje);
        } catch (e) {
            console.error(e);
            this.vista.mostrarPorcentajeProducto(0);
        }
    }

    private async cargarProductos(): Promise<void> {
        const resultado = await Cl_sProducto.obtenerProductos();
        if (resultado.ok) {
            this.productosDisponibles = resultado.tabla.map((p: any) => new Cl_mProducto(p));
            this.vista.cargarProductosDisponibles(this.productosDisponibles);
            // Actualizar porcentaje para el producto seleccionado inicialmente
            const codigoInicial = this.vista.codigoProducto;
            if (codigoInicial) this.actualizarPorcentajeProducto(codigoInicial);
        }
    }

    private onAgregarProducto(): void {
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

    private onEliminarProducto(codigo: number): void {
        this.pedidoActual.eliminarProducto(codigo);
        this.actualizarListaProductos();
    }

    private actualizarListaProductos(): void {
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

    private async onGuardar(): Promise<void> {
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