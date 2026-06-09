export default interface I_vMenu {
    onProductos(callback: () => void): void;
    onPedidos(callback: () => void): void;
    mostrar(): void;
    ocultar(): void;
}