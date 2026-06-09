import Cl_mPedido from "./Cl_mPedido.js";
import Cl_mProducto from "./Cl_mProducto.js";

export default class Cl_mCafetin {
    private pedidos: Cl_mPedido[] = [];

    setPedidos(array: any[]): void {
        this.pedidos = [];
        for (let i = 0; i < array.length; i++) {
            const pedidoData = array[i];
            const productos = pedidoData.productos.map((p: any) => new Cl_mProducto(p));
            this.pedidos.push(new Cl_mPedido({
                nombreCliente: pedidoData.nombreCliente,
                tipoPago: pedidoData.tipoPago,
                productos: productos
            }));
        }
    }

    getPedidos(): Cl_mPedido[] {
        return [...this.pedidos];
    }

    agregarPedido(pedido: Cl_mPedido): void {
        this.pedidos.push(pedido);
    }

    totalGeneral(): number {
        let total = 0;
        for (let i = 0; i < this.pedidos.length; i++) {
            total += this.pedidos[i].total();
        }
        return total;
    }

    cantidadPedidos(): number {
        return this.pedidos.length;
    }
}