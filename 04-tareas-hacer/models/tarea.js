const {v4: uudiv4} = require('uuid'); // aqui se importa uuid la funcion v4 que se renombre con uudiv4

class Tarea {
    id ='';
    desc ='';
    completadoEn=null;
    constructor(desc) {
        this.id = uudiv4(); // esto genera un identificador unico
        this.desc = desc;
        this.completadoEn = null;
    }

}

module.exports = Tarea;
