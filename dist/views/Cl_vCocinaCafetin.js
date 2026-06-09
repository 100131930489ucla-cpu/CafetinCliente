export class Cl_vCocinaCafetin {
    tabla;
    constructor() {
        this.tabla = document.getElementById("tablaPedidos");
    }
    // Toma la lista de pedidos de la nube y los dibuja en la pantalla de la cocina
    mostrarPedidos(pedidos) {
        if (!this.tabla)
            return;
        this.tabla.innerHTML = ""; // Limpiar mensaje de carga
        if (pedidos.length === 0) {
            this.tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay pedidos pendientes en cola.</td></tr>`;
            return;
        }
        pedidos.forEach((p) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>${p.nombreCliente}</strong></td>
                <td><span class="badge bg-primary fs-6">${p.producto}</span></td>
                <td class="text-center">${p.cantidad}</td>
                <td class="text-end">$${p.precioUnitario.toFixed(2)}</td>
                <td class="text-end fw-bold text-success">$${p.total.toFixed(2)}</td>
            `;
            this.tabla.appendChild(fila);
        });
    }
}
//# sourceMappingURL=Cl_vCocinaCafetin.js.map