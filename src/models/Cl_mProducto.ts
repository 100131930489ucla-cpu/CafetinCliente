export default class Cl_mProducto {
    private tabla: string = "producto";
    private _codigo: number = 0;
    private _nombre: string = "";
    private _cantidad: number = 0;
    private _precioUnitario: number = 0;

    constructor({ codigo, nombre, cantidad, precioUnitario }: {
        codigo: number;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
    }) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    get codigo(): number { return this._codigo; }
    set codigo(value: number) { this._codigo = value; }

    get nombre(): string { return this._nombre; }
    set nombre(value: string) { this._nombre = value; }

    get cantidad(): number { return this._cantidad; }
    set cantidad(value: number) { this._cantidad = value; }

    get precioUnitario(): number { return this._precioUnitario; }
    set precioUnitario(value: number) { this._precioUnitario = value; }

    subtotal(): number {
        return this.cantidad * this.precioUnitario;
    }

    toJSON(): object {
        return {
            tabla: this.tabla,
            codigo: this._codigo,
            nombre: this._nombre,
            cantidad: this._cantidad,
            precioUnitario: this._precioUnitario
        };
    }
}