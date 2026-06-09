import I_vMenu from "../interfaces/I_vMenu.js";

export default class Cl_vMenu implements I_vMenu {
    private btnProductos: HTMLButtonElement;
    private btnPedidos: HTMLButtonElement;
    private ui: HTMLElement;

    constructor() {
        this.ui = document.getElementById("menu") as HTMLElement;
        this.btnProductos = document.getElementById("menu_btnProductos") as HTMLButtonElement;
        this.btnPedidos = document.getElementById("menu_btnPedidos") as HTMLButtonElement;
    }

    onProductos(callback: () => void): void { this.btnProductos.onclick = callback; }
    onPedidos(callback: () => void): void { this.btnPedidos.onclick = callback; }
    mostrar(): void { this.ui.removeAttribute("hidden"); }
    ocultar(): void { this.ui.setAttribute("hidden", "true"); }
}