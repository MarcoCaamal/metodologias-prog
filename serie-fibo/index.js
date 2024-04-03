const rl = require('readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
    const n = parseInt(await rl.question('Ingrese un número n para la serie: '))

    const serie = [0, 1];
    
    for(let i = 1; i <= n - 1; i++) {
        serie.push(serie[i] + serie[i - 1]);
    }

    console.table(serie);

    rl.close();
};

main();