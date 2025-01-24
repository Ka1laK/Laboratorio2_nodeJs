require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    
    let opt ='';
    const tareas = new Tareas();
    const tareasDB = leerDB(); // funcion quer la BD si existen datos los retorna
    if(tareasDB) {// cargar tareas leidas 
        tareas.cargarTareasFromArray(tareasDB); // se invoca la funcion cargarTarea
        
    }

    do {
        // la funcion inquirerMenu imprime el menu.
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descipcion: ');
                tareas.crearTarea(desc);
                
                break;
            case '2':
                tareas.listadoCompleto(tareasDB)
                break;
            case '3':
                tareas.listarPendientesConpletadas(tareasDB,true)
                break;
            case '4':
                tareas.listarPendientesConpletadas(tareasDB,false)
                break;
            case '5': //completado , pendiente
                const ids = await mostrarListadoCheklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;   
            case '6': //borra tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                //pregunta de confirmacion
                if(id!== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente')
                    }

                }
                break;
            }



        guardarDB(tareas.listadoArr);
       
        await pausa();

    } while(opt !== '0');
  

}

main();

// completado hasta el punto 15 - labo 1