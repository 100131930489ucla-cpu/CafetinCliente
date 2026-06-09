export default class Cl_vCafetin {
    ui;
    btnRecargar;
    btnVolver;
    btnProcesar;
    inIdPedido;
    tblPedidos;
    lblTotalGeneral;
    lblCantidadPedidos;
    constructor() {
        this.ui = document.getElementById("cafetin");
        this.btnRecargar = document.getElementById("cafetin_btnRecargar");
        this.btnVolver = document.getElementById("cafetin_btnVolver");
        this.btnProcesar = document.getElementById("cafetin_btnProcesar");
        this.inIdPedido = document.getElementById("cafetin_inIdPedido");
        this.tblPedidos = document.getElementById("cafetin_tblPedidos");
        this.lblTotalGeneral = document.getElementById("cafetin_lblTotalGeneral");
        this.lblCantidadPedidos = document.getElementById("cafetin_lblCantidadPedidos");
    }
    onRecargar(callback) {
        this.btnRecargar.onclick = callback;
    }
    onVolver(callback) {
        this.btnVolver.onclick = callback;
    }
    // ✅ NUEVO: Implementar onProcesarPedido
    onProcesarPedido(callback) {
        this.btnProcesar.onclick = () => {
            const id = this.inIdPedido.value.trim();
            if (id) {
                callback(id);
                this.inIdPedido.value = "";
            }
            else {
                alert("Ingrese un ID de pedido válido");
            }
        };
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
    // ✅ MODIFICADO: mostrarPedidos recibe any[] para incluir el id
    mostrarPedidos(pedidos) {
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
    mostrarEstadisticas(stats) {
        this.lblTotalGeneral.innerHTML = `$${stats.totalGeneral.toFixed(2)}`;
        this.lblCantidadPedidos.innerHTML = stats.cantidadPedidos.toString();
    }
    mostrarError() {
        this.tblPedidos.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar datos</td></tr>`;
    }
}
//# sourceMappingURL=Cl_vCafetin.js.map