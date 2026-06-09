import Cl_mProducto from "./Cl_mProducto.js";

export default class Cl_mPedido {
    private tabla: string = "pedido";
    private _nombreCliente: string = "";
    private _tipoPago: string = "";
    private productos: Cl_mProducto[] = [];

    constructor({ nombreCliente, tipoPago, productos }: {
        nombreCliente: string;
        tipoPago: string;
        productos: Cl_mProducto[];
    }) {
        this.nombreCliente = nombreCliente;
        this.tipoPago = tipoPago;
        this.productos = productos;
    }

    get nombreCliente(): string { return this._nombreCliente; }
    set nombreCliente(value: string) { this._nombreCliente = value; }

    get tipoPago(): string { return this._tipoPago; }
    set tipoPago(value: string) { this._tipoPago = value; }

    getProductos(): Cl_mProducto[] { return this.productos; }

    agregarProducto(producto: Cl_mProducto): void {
        for(let i =0; i < this.productos.length; i++){
            if(this.productos[i].codigo == producto.codigo){
                this.productos[i].cantidad+= producto.cantidad
                return
            }
        }
        this.productos.push(producto)

            
    }

    eliminarProducto(codigo: number): void {
        const index = this.productos.findIndex(p => p.codigo === codigo);
        if (index !== -1) {
            this.productos.splice(index, 1);
        }
    }

    total(): number {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].subtotal();
        }
        return total;
    }

    toJSON(): object {
        return {
            tabla: this.tabla,
            nombreCliente: this.nombreCliente,
            tipoPago: this.tipoPago,
            productos: this.productos.map(p => p.toJSON()),
            total: this.total()
        };
    }
}