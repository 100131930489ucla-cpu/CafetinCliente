export default class Cl_vProducto {
    ui;
    inCodigo;
    inNombre;
    inPrecioUnitario;
    btnAgregar;
    btnEliminar; // solo Agregar y Eliminar
    btnVolver;
    tblRegistros;
    constructor() {
        this.ui = document.getElementById("productos");
        this.inCodigo = document.getElementById("producto_inCodigo");
        this.inNombre = document.getElementById("producto_inNombre");
        this.inPrecioUnitario = document.getElementById("producto_inPrecioUnitario");
        this.btnAgregar = document.getElementById("producto_btAgregar");
        this.btnEliminar = document.getElementById("producto_btEliminar");
        this.btnVolver = document.getElementById("producto_btVolver");
        this.tblRegistros = document.getElementById("producto_tblRegistros");
    }
    get codigo() { return parseInt(this.inCodigo.value) || 0; }
    get nombre() { return this.inNombre.value; }
    get precioUnitario() { return parseFloat(this.inPrecioUnitario.value) || 0; }
    onAgregar(callback) { this.btnAgregar.onclick = callback; }
    onEliminar(callback) { this.btnEliminar.onclick = callback; }
    onVolver(callback) { this.btnVolver.onclick = callback; }
    mostrar() { this.ui.removeAttribute("hidden"); }
    ocultar() { this.ui.setAttribute("hidden", "true"); }
    limpiar() {
        this.inCodigo.value = "";
        this.inNombre.value = "";
        this.inPrecioUnitario.value = "";
    }
    mostrarProductos(productos) {
        this.tblRegistros.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];
            this.tblRegistros.innerHTML += `<tr>
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td class="text-end">$${p.precioUnitario.toFixed(2)}</td>
            </tr>`;
        }
    }
}
//# sourceMappingURL=Cl_vProducto.js.map