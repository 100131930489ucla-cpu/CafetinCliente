export default class Cl_vPedido {
    inNombreCliente;
    inTipoPago;
    selProducto;
    inCantidad;
    btnAgregarProducto;
    btnGuardar;
    tblProductos;
    lblTotal;
    lblPorcentaje;
    constructor() {
        this.inNombreCliente = document.getElementById("pedido_inNombreCliente");
        this.inTipoPago = document.getElementById("pedido_inTipoPago");
        this.selProducto = document.getElementById("pedido_selProducto");
        this.inCantidad = document.getElementById("pedido_inCantidad");
        this.btnAgregarProducto = document.getElementById("pedido_btnAgregarProducto");
        this.btnGuardar = document.getElementById("pedido_btnGuardar");
        this.tblProductos = document.getElementById("pedido_tblProductos");
        this.lblTotal = document.getElementById("pedido_lblTotal");
        this.lblPorcentaje = document.getElementById("pedido_lblPorcentaje");
    }
    get nombreCliente() { return this.inNombreCliente.value; }
    get tipoPago() { return this.inTipoPago.value; }
    get codigoProducto() { return parseInt(this.selProducto.value) || 0; }
    get cantidad() { return parseInt(this.inCantidad.value) || 0; }
    onAgregarProducto(callback) { this.btnAgregarProducto.onclick = callback; }
    onEliminarProducto(callback) {
        window.eliminarProductoCallback = callback;
    }
    onGuardar(callback) { this.btnGuardar.onclick = callback; }
    cargarProductosDisponibles(productos) {
        this.selProducto.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];
            this.selProducto.innerHTML += `<option value="${p.codigo}">${p.nombre} - $${p.precioUnitario}</option>`;
        }
    }
    mostrarProductosSeleccionados(productos) {
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
            const btn = botones[i];
            const codigo = parseInt(btn.getAttribute("data-codigo") || "0");
            console.log("Configurando botón con código:", codigo);
            btn.onclick = () => {
                console.log("Botón clickeado, código:", codigo);
                if (window.eliminarProductoCallback) {
                    window.eliminarProductoCallback(codigo);
                }
            };
        }
    }
    actualizarTotalPedido(total) {
        this.lblTotal.innerHTML = total.toFixed(2);
    }
    limpiarProductoInput() {
        this.inCantidad.value = "1";
    }
    limpiar() {
        this.inNombreCliente.value = "";
        this.inTipoPago.value = "";
        this.inCantidad.value = "1";
        this.tblProductos.innerHTML = "";
        this.lblTotal.innerHTML = "0.00";
    }
    onProductoSeleccionado(callback) {
        this.selProducto.onchange = () => callback(this.codigoProducto);
    }
    mostrarPorcentajeProducto(percentage) {
        if (!this.lblPorcentaje)
            return;
        if (!isFinite(percentage) || percentage <= 0) {
            this.lblPorcentaje.innerText = "—";
        }
        else {
            this.lblPorcentaje.innerText = `${percentage.toFixed(2)}%`;
        }
    }
}
//# sourceMappingURL=Cl_vPedido.js.map