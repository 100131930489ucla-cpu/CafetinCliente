import I_vProducto from "../interfaces/I_vProducto.js";

export default class Cl_vProducto implements I_vProducto {
    private ui: HTMLElement;
    private inCodigo: HTMLInputElement;
    private inNombre: HTMLInputElement;
    private inPrecioUnitario: HTMLInputElement;
    private btnAgregar: HTMLButtonElement;
    private btnEliminar: HTMLButtonElement;   // solo Agregar y Eliminar
    private btnVolver: HTMLButtonElement;
    private tblRegistros: HTMLTableSectionElement;

    constructor() {
        this.ui = document.getElementById("productos") as HTMLElement;
        this.inCodigo = document.getElementById("producto_inCodigo") as HTMLInputElement;
        this.inNombre = document.getElementById("producto_inNombre") as HTMLInputElement;
        this.inPrecioUnitario = document.getElementById("producto_inPrecioUnitario") as HTMLInputElement;
        this.btnAgregar = document.getElementById("producto_btAgregar") as HTMLButtonElement;
        this.btnEliminar = document.getElementById("producto_btEliminar") as HTMLButtonElement;
        this.btnVolver = document.getElementById("producto_btVolver") as HTMLButtonElement;
        this.tblRegistros = document.getElementById("producto_tblRegistros") as HTMLTableSectionElement;
    }

    get codigo(): number { return parseInt(this.inCodigo.value) || 0; }
    get nombre(): string { return this.inNombre.value; }
    get precioUnitario(): number { return parseFloat(this.inPrecioUnitario.value) || 0; }

    onAgregar(callback: () => void): void { this.btnAgregar.onclick = callback; }
    onEliminar(callback: () => void): void { this.btnEliminar.onclick = callback; }
    onVolver(callback: () => void): void { this.btnVolver.onclick = callback; }

    mostrar(): void { this.ui.removeAttribute("hidden"); }
    ocultar(): void { this.ui.setAttribute("hidden", "true"); }

    limpiar(): void {
        this.inCodigo.value = "";
        this.inNombre.value = "";
        this.inPrecioUnitario.value = "";
    }

    mostrarProductos(productos: any[]): void {
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