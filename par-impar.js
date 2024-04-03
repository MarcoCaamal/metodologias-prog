

const main = async () => {
    const rl = require('readline/promises').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const numero = parseInt(await rl.question('Ingrese un numero: '));

    if(numero % 2 === 0) {
        console.log(`El número ${numero} es par`)
    } else {
        console.log(`El número ${numero} es impar`)
    }
    rl.close();
};

main();

