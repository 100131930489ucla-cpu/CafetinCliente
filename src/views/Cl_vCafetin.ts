import I_vCafetin from "../interfaces/I_vCafetin.js";

export default class Cl_vCafetin implements I_vCafetin {
    private ui: HTMLElement;
    private btnRecargar: HTMLButtonElement;
    private btnVolver: HTMLButtonElement;
    private btnProcesar: HTMLButtonElement;
    private inIdPedido: HTMLInputElement;
    private tblPedidos: HTMLTableSectionElement;
    private lblTotalGeneral: HTMLElement;
    private lblCantidadPedidos: HTMLElement;

    constructor() {
        this.ui = document.getElementById("cafetin") as HTMLElement;
        this.btnRecargar = document.getElementById("cafetin_btnRecargar") as HTMLButtonElement;
        this.btnVolver = document.getElementById("cafetin_btnVolver") as HTMLButtonElement;
        this.btnProcesar = document.getElementById("cafetin_btnProcesar") as HTMLButtonElement;
        this.inIdPedido = document.getElementById("cafetin_inIdPedido") as HTMLInputElement;
        this.tblPedidos = document.getElementById("cafetin_tblPedidos") as HTMLTableSectionElement;
        this.lblTotalGeneral = document.getElementById("cafetin_lblTotalGeneral") as HTMLElement;
        this.lblCantidadPedidos = document.getElementById("cafetin_lblCantidadPedidos") as HTMLElement;
    }

    onRecargar(callback: () => void): void {
        this.btnRecargar.onclick = callback;
    }

    onVolver(callback: () => void): void {
        this.btnVolver.onclick = callback;
    }

    // ✅ NUEVO: Implementar onProcesarPedido
    onProcesarPedido(callback: (id: string) => void): void {
        this.btnProcesar.onclick = () => {
            const id = this.inIdPedido.value.trim();
            if (id) {
                callback(id);
                this.inIdPedido.value = "";
            } else {
                alert("Ingrese un ID de pedido válido");
            }
        };
    }

    mostrar(): void {
        this.ui.removeAttribute("hidden");
    }

    ocultar(): void {
        this.ui.setAttribute("hidden", "true");
    }

    // ✅ MODIFICADO: mostrarPedidos recibe any[] para incluir el id
    mostrarPedidos(pedidos: any[]): void {
        this.tblPedidos.innerHTML = "";
        if (pedidos.length === 0) {
            this.tblPedidos.innerHTML = `<tr><td colspan="6" class="text-center">No hay pedidos</td></tr>`;
            return;
        }

        for (let i = 0; i < pedidos.length; i++) {
            const p = pedidos[i];
            let productosStr = "";
            
            for (let j = 0; j < p.productos.length; j++) {
                const prod = p.productos[j];
                const subtotal = prod.cantidad * prod.precioUnitario;
                productosStr += `${prod.nombre} x${prod.cantidad}: ${subtotal}$<br>`;
            }
            productosStr = productosStr.slice(0, -2);
            
            this.tblPedidos.innerHTML += `<tr>
                <td class="text-center"><strong>${p.id}</strong></td>
                <td>${p.nombreCliente}</td>
                <td>${p.tipoPago}</td>
                <td>${productosStr}</td>
                <td class="text-end">$${p.total.toFixed(2)}</td>
            </tr>`;
        }
    }

    mostrarEstadisticas(stats: { totalGeneral: number; cantidadPedidos: number }): void {
        this.lblTotalGeneral.innerHTML = `$${stats.totalGeneral.toFixed(2)}`;
        this.lblCantidadPedidos.innerHTML = stats.cantidadPedidos.toString();
    }

    mostrarError(): void {
        this.tblPedidos.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar datos</td></tr>`;
    }
}