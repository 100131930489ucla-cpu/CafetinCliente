export default class Cl_mProducto {
    tabla = "producto";
    _codigo = 0;
    _nombre = "";
    _cantidad = 0;
    _precioUnitario = 0;
    constructor({ codigo, nombre, cantidad, precioUnitario }) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }
    get codigo() { return this._codigo; }
    set codigo(value) { this._codigo = value; }
    get nombre() { return this._nombre; }
    set nombre(value) { this._nombre = value; }
    get cantidad() { return this._cantidad; }
    set cantidad(value) { this._cantidad = value; }
    get precioUnitario() { return this._precioUnitario; }
    set precioUnitario(value) { this._precioUnitario = value; }
    subtotal() {
        return this.cantidad * this.precioUnitario;
    }
    toJSON() {
        return {
            tabla: this.tabla,
            codigo: this._codigo,
            nombre: this._nombre,
            cantidad: this._cantidad,
            precioUnitario: this._precioUnitario
        };
    }
}
//# sourceMappingURL=Cl_mProducto.js.map