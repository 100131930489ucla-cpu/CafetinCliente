export default interface I_vProducto {
    get codigo(): number;
    get nombre(): string;
    get precioUnitario(): number;
    onAgregar(callback: () => void): void;
    onEliminar(callback: () => void): void;
    onVolver(callback: () => void): void;
    mostrar(): void;
    ocultar(): void;
    limpiar(): void;
    mostrarProductos(productos: any[]): void;
}