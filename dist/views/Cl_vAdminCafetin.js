// src/views/Cl_vAdminCafetin.ts
export class Cl_vAdminCafetin {
    // Lee los datos que el usuario ingresa en el formulario
    obtenerDatosFormulario() {
        const cantidad = parseInt(document.getElementById("numCantidad").value) || 0;
        const precio = parseFloat(document.getElementById("numPrecio").value) || 0;
        return {
            nombreCliente: document.getElementById("txtCliente").value,
            producto: document.getElementById("selProducto").value,
            cantidad: cantidad,
            precioUnitario: precio,
            total: cantidad * precio
        };
    }
    // Limpia los campos tras un guardado exitoso
    limpiarFormulario() {
        document.getElementById("formPedido").reset();
        alert("¡Pedido enviado con éxito a la cocina! 🍔🔥");
    }
    // Escucha cuando el operador presiona el botón de guardar
    escucharBotonGuardar(manejador) {
        const boton = document.getElementById("btnGuardarPedido");
        if (boton) {
            boton.onclick = () => {
                const cliente = document.getElementById("txtCliente").value;
                if (cliente.trim() === "") {
                    alert("Por favor, ingrese el nombre del cliente ⚠️");
                    return;
                }
                manejador();
            };
        }
    }
}
//# sourceMappingURL=Cl_vAdminCafetin.js.map