/**
  Supongamos que estamos haciendo un sistema de gestion de inventarios para una tienda. Necesitamos una funcion que realice las siguientes operaciones: 
- Agregar un nuevo producto al inventario.
- Actualizar la cantidad disponible de un producto existe.
- Vender una cierta cantidad de un producto.
- Calcular el total del inventario en funcion de los precios y las cantidades de los productos.
 */

const rl = require('readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout
});
let contadorProductos = 2;
const productos = [
    {
        id: 1,
        nombre: 'Botella de agua',
        precio: 20.0,
        cantidad: 10
    }
];

const main = async () => {
    let opt;
    do {
        opt = await mostrarMenu();
        if(opt === '1') {
            listarProductos();
            await pausa();
        }
        if(opt === '2') {
            await agregarProducto();
            await pausa();
        } 
        if(opt === '3') {
            await actualizarProducto();
            await pausa();
        }
        if(opt === '4') {
            await venderProducto();
            await pausa();
        }
        if(opt === '5') {
            calcularInventario();
            await pausa();
        }
    } while(opt !== '0');
    rl.close();
};

main();

async function mostrarMenu() {
    console.clear();
    console.log('=================================');
    console.log('= MENU DE SISTEMA DE INVENTARIO =');
    console.log('=================================');
    console.log('\n');
    console.log('Usted puede realizar las siguientes operaciones: ');
    console.log('1.- Listar productos');
    console.log('2.- Agregar un nuevo producto');
    console.log('3.- Actualizar producto');
    console.log('4.- Vender un producto');
    console.log('5.- Calcular inventario');
    
    const opt = await rl.question('Ingrese el número de la opción a realizar: ');
    return opt;
}

async function pausa() {
    await rl.question('\nPrecione ENTER para continuar...');
}

function listarProductos() {
    console.clear();
    console.log('SE ESTAN IMPRIMIENDO LOS PRODUCTOS EN PANTALLA...');
    console.log('\n');
    console.table(productos);
}

async function agregarProducto() {
    console.clear();
    const nombre = await rl.question('Ingrese el nombre del producto: ');
    const precio = parseFloat( await rl.question('Ingrese el precio del producto: ') );
    const cantidad = parseInt( await rl.question('Ingrese la cantidad en stock: ') );

    const nuevoProducto = {
        id: contadorProductos,
        nombre,
        precio,
        cantidad
    };

    contadorProductos++;

    productos.push(nuevoProducto);

    console.log('\nPRODUCTO CREADO CORRECTAMENTE.')
}

async function actualizarProducto() {
    listarProductos();

    console.log('\n');

    const productoActualizarId = parseInt( await rl.question('Ingrese el ID del producto a actualizar: ') );

    const indexProductoActualizar = productos.findIndex(producto => producto.id === productoActualizarId);

    if(indexProductoActualizar === -1) {
        console.log(`EL PRODUCTO CON EL ID ${productoActualizarId} NO EXISTE EN EL INVENTARIO...`);
        return;
    }

    const cantidadNueva = parseInt(await rl.question('Ingrese la nueva cantidad del producto: '));

    productos[indexProductoActualizar].cantidad = cantidadNueva;

    console.log('\nEL PRODUCTO FUE ACTUALIZADO CORRECTAMENTE.');
}

async function venderProducto() {
    listarProductos();

    const productoVenderId = parseInt( await rl.question('Ingrese el ID del producto a vender: ') );

    const indexProductoVender = productos.findIndex(producto => producto.id === productoVenderId);

    if(indexProductoVender === -1) {
        console.log(`EL PRODUCTO CON EL ID ${productoVenderId} NO EXISTE EN EL INVENTARIO...`);
        return;
    }

    const cantidadVender = parseInt( await rl.question('Ingrese la cantidad de producto a vender: ') );

    if(cantidadVender > productos[indexProductoVender].cantidad) {
        console.log('NO SE PUEDE VENDER UNA CANTIDAD MAYOR A LA QUE HAY EN STOCK.');
        return;
    }

    productos[indexProductoVender].cantidad -= cantidadVender;

    console.log('\nSe ha vendido el producto correctamente.');
}

function calcularInventario() {
    console.clear();
    let total = 0;

    productos.forEach(producto => {
        total += producto.cantidad * producto.precio;
    });

    console.log(`\nEl total del inventario es: ${total}`);
}