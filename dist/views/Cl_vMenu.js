export default class Cl_vMenu {
    btnProductos;
    btnPedidos;
    ui;
    constructor() {
        this.ui = document.getElementById("menu");
        this.btnProductos = document.getElementById("menu_btnProductos");
        this.btnPedidos = document.getElementById("menu_btnPedidos");
    }
    onProductos(callback) { this.btnProductos.onclick = callback; }
    onPedidos(callback) { this.btnPedidos.onclick = callback; }
    mostrar() { this.ui.removeAttribute("hidden"); }
    ocultar() { this.ui.setAttribute("hidden", "true"); }
}
//# sourceMappingURL=Cl_vMenu.js.map