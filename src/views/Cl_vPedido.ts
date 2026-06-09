import I_vPedido from "../interfaces/I_vPedido.js";

export default class Cl_vPedido implements I_vPedido {
    private inNombreCliente: HTMLInputElement;
    private inTipoPago: HTMLInputElement;
    private selProducto: HTMLSelectElement;
    private inCantidad: HTMLInputElement;
    private btnAgregarProducto: HTMLButtonElement;
    private btnGuardar: HTMLButtonElement;
    private tblProductos: HTMLTableSectionElement;
    private lblTotal: HTMLElement;

    constructor() {
        this.inNombreCliente = document.getElementById("pedido_inNombreCliente") as HTMLInputElement;
        this.inTipoPago = document.getElementById("pedido_inTipoPago") as HTMLInputElement;
        this.selProducto = document.getElementById("pedido_selProducto") as HTMLSelectElement;
        this.inCantidad = document.getElementById("pedido_inCantidad") as HTMLInputElement;
        this.btnAgregarProducto = document.getElementById("pedido_btnAgregarProducto") as HTMLButtonElement;
        this.btnGuardar = document.getElementById("pedido_btnGuardar") as HTMLButtonElement;
        this.tblProductos = document.getElementById("pedido_tblProductos") as HTMLTableSectionElement;
        this.lblTotal = document.getElementById("pedido_lblTotal") as HTMLElement;
    }

    get nombreCliente(): string { return this.inNombreCliente.value; }
    get tipoPago(): string { return this.inTipoPago.value; }
    get codigoProducto(): number { return parseInt(this.selProducto.value) || 0; }
    get cantidad(): number { return parseInt(this.inCantidad.value) || 0; }

    onAgregarProducto(callback: () => void): void { this.btnAgregarProducto.onclick = callback; }
    onEliminarProducto(callback: (codigo: number) => void): void {
        (window as any).eliminarProductoCallback = callback;
    }
    onGuardar(callback: () => void): void { this.btnGuardar.onclick = callback; }

    cargarProductosDisponibles(productos: any[]): void {
        this.selProducto.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];
            this.selProducto.innerHTML += `<option value="${p.codigo}">${p.nombre} - $${p.precioUnitario}</option>`;
        }
    }

    mostrarProductosSeleccionados(productos: { codigo: number; nombre: string; cantidad: number; precioUnitario: number; subtotal: number }[]): void {
        this.tblProductos.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
            const item = productos[i];
            this.tblProductos.innerHTML += `<tr>
                <td>${item.nombre}</td>
                <td class="text-center">${item.cantidad}</td>
                <td class="text-end">$${item.precioUnitario.toFixed(2)}</td>
                <td class="text-end">$${item.subtotal.toFixed(2)}</td>
                <td class="text-center"><button class="btn-eliminar-producto" data-codigo="${item.codigo}">Eliminar</button></td>
            </tr>`;
        }
        const botones = document.querySelectorAll(".btn-eliminar-producto");
        for (let i = 0; i < botones.length; i++) {
            const btn = botones[i] as HTMLButtonElement;
            const codigo = parseInt(btn.getAttribute("data-codigo") || "0"); 
            console.log("Configurando botón con código:", codigo);
            btn.onclick = () => {
                console.log("Botón clickeado, código:", codigo);
                if ((window as any).eliminarProductoCallback) {
                    (window as any).eliminarProductoCallback(codigo);  
                }
            };
        }
    }

    actualizarTotalPedido(total: number): void {
        this.lblTotal.innerHTML = total.toFixed(2);
    }

    limpiarProductoInput(): void {
        this.inCantidad.value = "1";
    }

    limpiar(): void {
        this.inNombreCliente.value = "";
        this.inTipoPago.value = "";
        this.inCantidad.value = "1";
        this.tblProductos.innerHTML = "";
        this.lblTotal.innerHTML = "0.00";
    }
}