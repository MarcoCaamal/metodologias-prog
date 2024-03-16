require('colors');
const { Producto } = require('./producto');
const { readFile,  } = require('fs/promises');
const rl = require('node:readline/promises').
createInterface({
    input: process.stdin,
    output: process.stdout
});


class Inventario {
    productos = [];
    acumIds = 1;
    gananciaTotal = 0;

    async iniciarApp() {

        let option = 1;
        await this.cargarProductos();

        do {
            option = await this.mostrarMenu();
            
            if(option === 1) {
                console.clear();
                this.listarProductos();
                await this.pausa();
            }
            if(option === 2) await this.agregarProducto();
            if(option === 3) await this.actualizarProducto();
            if(option === 4) await this.venderUnProducto();
            if(option === 5) {
                this.calcularInventario();
                await this.pausa();
            }
            if(option === 6) {
                console.log(`La ganancia total es: ${this.gananciaTotal}`.green);
                await this.pausa();
            }
        } while (option != 0);

        console.log('HAS SALIDO DEL SISTEMA.'.red);
        rl.close();
    }

    async agregarProducto() {
        console.clear();
        const nombre = await rl.question('Ingrese el nombre del producto: ');
        const precio = Number.parseFloat(await rl.question('Ingrese el precio del producto: '));
        const cantidad = Number.parseInt(await rl.question('Ingrese la cantidad en stock: '));

        const newProducto = new Producto(nombre, precio, cantidad);
        newProducto.id = this.acumIds;
        this.acumIds++;

        this.productos.push(newProducto);

        console.log('\nSE HA CREADO CORRECTAMENTE EL PRODUCTO'.green);

        await this.pausa();
    }

    listarProductos() {
        console.log('##########################'.green);
        console.log('#  Listando productos... #'.green);
        console.log('##########################'.green);
        this.productos.forEach(producto => {
            console.log(`ID: ${producto.id}, nombre: ${producto.nombre}, precio: ${producto.precio}, cantidad: ${producto.cantidad}`.green);
        });
    }

    async actualizarProducto() {
        console.clear();
        console.log('INFORMACION'.blue);
        console.log('Se van a listar los productos...'.blue);
        console.log('\n');
        this.listarProductos();
        console.log('\n');

        const idProducto = parseInt(await rl.question('Ingresa el ID del producto a actualizar: '));

        const indexProduct = this.productos.findIndex(producto => producto.id == idProducto);
        if(indexProduct === -1) {
            console.log(`NO SE ENCONTRO EL PRODUCTO CON EL ID ${idProducto}.`.red)
            await this.pausa();
            this.iniciarApp();
            return;
        }

        const cantidadNueva = parseInt(await rl.question('Ingresa la nueva cantidad de productos: '));

        this.productos[indexProduct].cantidad = cantidadNueva;

        console.log('PRODUCTO ACTUALIZADO CORRECTAMENTE.'.green);

        await this.pausa();
    }

    async venderUnProducto() {
        console.clear();
        console.log('INFORMACION'.blue);
        console.log('Se van a listar los productos...'.blue);
        console.log('\n');
        this.listarProductos();
        console.log('\n');
        
        const idProducto = parseInt(await rl.question('Ingresa el id del producto a vender: '));
        console.log('\n');

        const indexProduct = this.productos.findIndex(producto => producto.id == idProducto);
        if(indexProduct === -1) {
            console.log(`NO SE ENCONTRO EL PRODUCTO CON EL ID ${idProducto}.`.red)
            await this.pausa();
            this.iniciarApp();
            return;
        }

        console.log('\n');

        const cantidadVendida = parseInt( await rl.question('Ingresa la cantidad de producto que deseas vender: ') );

        console.log('\n');

        if(cantidadVendida > this.productos[indexProduct].cantidad) {
            console.log('NO SE PUEDE VENDER UNA MAYOR CANTIDAD DE PRODUCTO A LO QUE HAY EN EL STOCK.'.red);
            await this.pausa();
            this.iniciarApp();
            return;
        }

        this.productos[indexProduct].cantidad -= cantidadVendida;

        this.gananciaTotal += cantidadVendida * this.productos[indexProduct].precio;

        console.log('SE HA HECHO LA VENTA CORRECTAMENTE.'.green);

        await this.pausa();
    }

    calcularInventario() {
        console.clear();
        let total = 0;

        this.productos.forEach(producto => {
            total += (producto.cantidad * producto.precio);
        });
        
        console.log('El precio del inventario total es: ', total);
    }

    async mostrarMenu() {
        console.clear();

        console.log('####################################################'.green);
        console.log('#  Bienvenido al sistema de gestion de invantario  #'.green);
        console.log('####################################################'.green);
        console.log(`\nGANANCIA TOTAL: ${this.gananciaTotal}\n`)
        console.log('Usted puede realizar las siguientes acciones: ');
        console.log('1.-'.green, ' Ver listado de productos.');
        console.log('2.-'.green, ' Agregar un nuevo producto.');
        console.log('3.-'.green, ' Actualizar stock de un producto ya existente.');
        console.log('4.-'.green, ' Vender un producto.');
        console.log('5.-'.green, ' Calcular el inventario total.');
        console.log('0.-'.green, ' Salir.');
        console.log();
        const opt = await rl.question('Ingrese la opción de la operación que desea realizar: ');

        return parseInt(opt);
    }

    async pausa() {
        await rl.question(`\nPrecione ${'ENTER'.green} para continuar...`);
    }

    async cargarProductos() {
        console.log('SE HA INICIADO UNA CARGA DE PRODUCTOS'.green);
        console.log('\n');

        try {
            const contents = await readFile('./productos.json', { encoding: 'utf-8'});

            const datos = JSON.parse(contents);

            datos.forEach(dato => this.productos.push(new Producto(dato.nombre, dato.precio, dato.cantidad, dato.id)));

            console.log('PRODUCTOS CARGADOS CORRECTAMENTE...'.green);

            this.acumIds = datos.length + 1;

            await this.pausa();

        } catch(error) {
            console.log('HA OCURRIDO UN ERROR AL INTENTAR CARGAR LOS PRODUCTOS.'.red);
            await this.pausa();
            console.log(error);
        }

        console.clear();
    }
}

module.exports = {
    Inventario
};