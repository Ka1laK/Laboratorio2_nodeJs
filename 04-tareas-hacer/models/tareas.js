const Tarea = require("./tarea");

class Tareas {
    _listado = {};
    //definimos la funcion get como un arreglo.
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]; //obtengo la key de _listado
            listado.push(tarea);

        }); // el metodo object, permite recorrer las llaves del objeto _listado
        return listado;

    }

    constructor(){
        this._listado = {};
    }
    //metodo para crear tarea
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(listadotars = []) {
        let estado='';
        listadotars.forEach((tarea, i) =>{
            let idx =`${i+1}`.green;
            if(tarea.completadoEn!= null) {
                estado = 'Completado'.green
            } else {
                estado = 'Pendiente'.red
            }

           console.log( `${idx} ${'.'.green} ${tarea.desc} :: ${estado}`)
                  
        });

    }

    //metodo para listar tareas completas o pendientes
    listarPendientesConpletadas(listadotars = [],completadas = true){
        let estado='';
        let i=0;
        if(completadas){
           
            listadotars.forEach((tarea) =>{
               
                if(tarea.completadoEn!= null) {
                    let idx =`${i+1}`.green;
                    estado = 'Completado'.green
                    console.log( `${idx} ${'.'.green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
                    i=i+1;

                }
                
            });
     
        } else{
            
            listadotars.forEach((tarea) =>{
                
                if(tarea.completadoEn === null) {
                    let idx =`${i+1}`.green;
                    estado = 'Pendiente'.red
                    console.log( `${idx} ${'.'.green} ${tarea.desc} :: ${estado}`);
                    i=i+1;
                }
                
            });

        }

    }
    toggleCompletadas(ids = []) {

        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })
    }



}

module.exports = Tareas;
