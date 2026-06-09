const API_URL = "https://6a119bb23e35d0f37ee373e6.mockapi.io/pedidos";
export class PedidoService {
    static async guardar(pedido) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });
    }
    static async obtenerTodos() {
        const res = await fetch(API_URL);
        if (!res.ok)
            throw new Error("Error de conexión");
        return await res.json();
    }
}
//# sourceMappingURL=PedidoService.js.map