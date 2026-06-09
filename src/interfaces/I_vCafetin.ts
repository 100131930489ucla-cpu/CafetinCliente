export default interface I_vCafetin {
    onRecargar(callback: () => void): void;
    onVolver(callback: () => void): void;
    onProcesarPedido(callback: (id: string) => void): void; 
    mostrar(): void;
    ocultar(): void;
    mostrarPedidos(pedidos: any[]): void;  // any[] para incluir el id
    mostrarEstadisticas(stats: { totalGeneral: number; cantidadPedidos: number }): void;
    mostrarError(): void;
}