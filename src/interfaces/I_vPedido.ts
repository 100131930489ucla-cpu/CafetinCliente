export default interface I_vPedido {
    get nombreCliente(): string;
    get tipoPago(): string;
    get codigoProducto(): number;
    get cantidad(): number;
    onAgregarProducto(callback: () => void): void;
    onEliminarProducto(callback: (codigo: number) => void): void; 
    onGuardar(callback: () => void): void;
    cargarProductosDisponibles(productos: any[]): void;
    mostrarProductosSeleccionados(productos: { 
        codigo: number;        
        nombre: string; 
        cantidad: number; 
        precioUnitario: number; 
        subtotal: number 
    }[]): void;
    actualizarTotalPedido(total: number): void;
    limpiarProductoInput(): void;
    limpiar(): void;
    onProductoSeleccionado(callback: (codigo: number) => void): void;
    mostrarPorcentajeProducto(percentage: number): void;
}