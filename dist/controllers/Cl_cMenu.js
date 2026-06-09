import Cl_vProducto from "../views/Cl_vProducto.js";
import Cl_cProducto from "./Cl_cProducto.js";
import Cl_vCafetin from "../views/Cl_vCafetin.js";
import Cl_cCafetin from "./Cl_cCafetin.js";
export default class Cl_cMenu {
    vista;
    constructor(vista) {
        this.vista = vista;
        this.vista.onProductos(() => this.onProductos());
        this.vista.onPedidos(() => this.onPedidos());
    }
    onProductos() {
        // Ocultar el menú principal
        this.vista.ocultar();
        // Crear la vista de productos
        const vistaProducto = new Cl_vProducto();
        // Crear el controlador con callback para volver
        new Cl_cProducto(vistaProducto, () => {
            // Ocultar la vista de productos y mostrar el menú
            vistaProducto.ocultar();
            this.vista.mostrar();
        });
    }
    onPedidos() {
        // Ocultar el menú principal
        this.vista.ocultar();
        // Crear la vista de cafetín
        const vistaCafetin = new Cl_vCafetin();
        // Crear el controlador con callback para volver
        new Cl_cCafetin(vistaCafetin, () => {
            // Ocultar la vista de cafetín y mostrar el menú
            vistaCafetin.ocultar();
            this.vista.mostrar();
        });
    }
}
//# sourceMappingURL=Cl_cMenu.js.map