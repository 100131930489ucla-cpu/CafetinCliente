export default class Cl_mPedido {
    tabla = "pedido";
    _nombreCliente = "";
    _tipoPago = "";
    productos = [];
    constructor({ nombreCliente, tipoPago, productos }) {
        this.nombreCliente = nombreCliente;
        this.tipoPago = tipoPago;
        this.productos = productos;
    }
    get nombreCliente() { return this._nombreCliente; }
    set nombreCliente(value) { this._nombreCliente = value; }
    get tipoPago() { return this._tipoPago; }
    set tipoPago(value) { this._tipoPago = value; }
    getProductos() { return this.productos; }
    agregarProducto(producto) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].codigo == producto.codigo) {
                this.productos[i].cantidad += producto.cantidad;
                return;
            }
        }
        this.productos.push(producto);
    }
    eliminarProducto(codigo) {
        const index = this.productos.findIndex(p => p.codigo === codigo);
        if (index !== -1) {
            this.productos.splice(index, 1);
        }
    }
    total() {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].subtotal();
        }
        return total;
    }
    toJSON() {
        return {
            tabla: this.tabla,
            nombreCliente: this.nombreCliente,
            tipoPago: this.tipoPago,
            productos: this.productos.map(p => p.toJSON()),
            total: this.total()
        };
    }
}
//# sourceMappingURL=Cl_mPedido.js.map