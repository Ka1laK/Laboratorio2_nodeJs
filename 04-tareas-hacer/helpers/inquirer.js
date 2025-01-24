const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`  //'1. Crear Tarea'
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`//'2. Listar Tarea'
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completas`//'3. Listar Tarea Completas'
            },
            {
                value: '4',
                name:  `${'4.'.green} Listar Tarea Pendientes`//'4. Listar Tarea Pendientes'
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea`//'5. Completar Tarea(s)'
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`//'6. Borrar Tarea'
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`//'0. Salir'
            }

        ]

    }
];




const pausas = [
    {
        type: 'input',
        name: 'enter',
        message: `\nPresione ${ 'ENTER'.blue} para continuar\n`
        
    }

];

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log(' Seleccione una opcion'.green);
    console.log('======================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}

const pausa =async() => {
    console.log('\n');
    const {enter} = await inquirer.prompt(pausas);
    return enter;    

}

const leerInput = async(message) => {
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}


const listadoTareasBorrar = async(tareas = []) =>{
    const choices = tareas.map((tarea,i) =>{
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}` 
        }
    });
    //para crear una opcion e la parte superior
    //sera la opcion de cancelar
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'

    })
    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}


const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheklist = async(tareas = []) =>{
    const choices = tareas.map((tarea,i) =>{
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}` ,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    
    const pregunta =[
        {
            type: 'checkbox',
            name: 'ids', //retornara un arreglo de id
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}




module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheklist
}
