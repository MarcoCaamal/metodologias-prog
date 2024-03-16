/**
  Supongamos que estamos haciendo un sistema de gestion de inventarios para una tienda. Necesitamos una funcion que realice las siguientes operaciones: 
- Agregar un nuevo producto al inventario.
- Actualizar la cantidad disponible de un producto existe.
- Vender una cierta cantidad de un producto.
- Calcular el total del inventario en funcion de los precios y las cantidades de los productos.
 */

const { Inventario } = require('./clases/inventario')

const app = new Inventario();

app.iniciarApp();