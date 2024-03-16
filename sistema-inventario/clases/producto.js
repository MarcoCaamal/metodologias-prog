
class Producto {
    id;
    nombre = '';
    precio = 0.0;
    cantidad = 0;

    constructor(nombre, precio, cantidad, id = 0) {
        this.precio = precio;
        this.nombre = nombre;
        this.cantidad = cantidad,
        this.id = id;
    }
}

module.exports = {
    Producto
};