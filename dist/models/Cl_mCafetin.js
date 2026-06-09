import Cl_mPedido from "./Cl_mPedido.js";
import Cl_mProducto from "./Cl_mProducto.js";
export default class Cl_mCafetin {
    pedidos = [];
    setPedidos(array) {
        this.pedidos = [];
        for (let i = 0; i < array.length; i++) {
            const pedidoData = array[i];
            const productos = pedidoData.productos.map((p) => new Cl_mProducto(p));
            this.pedidos.push(new Cl_mPedido({
                nombreCliente: pedidoData.nombreCliente,
                tipoPago: pedidoData.tipoPago,
                productos: productos
            }));
        }
    }
    getPedidos() {
        return [...this.pedidos];
    }
    agregarPedido(pedido) {
        this.pedidos.push(pedido);
    }
    totalGeneral() {
        let total = 0;
        for (let i = 0; i < this.pedidos.length; i++) {
            total += this.pedidos[i].total();
        }
        return total;
    }
    cantidadPedidos() {
        return this.pedidos.length;
    }
}
//# sourceMappingURL=Cl_mCafetin.js.map