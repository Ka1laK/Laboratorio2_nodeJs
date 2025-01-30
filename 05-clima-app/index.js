require('dotenv').config({ path: './tokens.env' });
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
console.clear();

const main = async() => {
    const busquedas = new Busquedas();
    let opt = 0;
    do {
        // llamada a la funcion que pinta el menu
        opt = await inquirerMenu();
        switch(opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                //buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
                //seleccionar el lugar
                const id = await listarLugares(lugares);

                const lugarSel = lugares.find( l => l.id === id);
                //guardar en arreglo
                busquedas.agregarHistorial(lugarSel.nombre);
                // clima
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                // mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Maxima: ', clima.max);
                console.log('Minima: ', clima.min);
                console.log('Estado del clima: ', clima.desc.green);


                break;
            case 2:
                // aqui en vez de busqueda.historial poner busqueda.historialCapitalizado
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${i+1}`.green;
                    console.log(`${idx} ${lugar}`);

                })
                break;

            case 0:
                break;

        }
        await pausa();

    } while(opt !== 0);

}
main();
// open weather punto 25