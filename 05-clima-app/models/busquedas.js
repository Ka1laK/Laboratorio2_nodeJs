const axios = require('axios');
const fs = require('fs');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        // TO DO leer la BD si existe
        this.leerDB();
    }

    get paramMapBox(){
        return { 
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'

        }
    }


    get paramOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang' : 'es'
        }
    }

    get historialCapitalizado(){
        //cada palabra debe ir en mayuscula
        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras=palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
    }


    agregarHistorial(lugar = ''){
        // To DO: prevenir duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;

        }
        this.historial = this.historial.splice(0,5); // esto corta el arreglo a solo 6 elementos
        this.historial.unshift(lugar.toLocaleLowerCase()); // inserta en posicion 0 del arreglo

        //grabar en DB.
        this.guardarDB();

    }

    

    guardarDB(){
        const payload ={
            historial: this.historial

        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }


    leerDB(){
        //debe existir la db .. si no no hacer nada

        if(!fs.existsSync(this.dbPath)){
            return null;
        }
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'} );
        const data = JSON.parse(info);
        this.historial = data.historial;
       
    }



    async ciudad(lugar = '') {
        // To Do hacer peticion http
        try {
            //Peticion HTTP
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramMapBox

            });
              const resp = await instance.get();
              // retorna un arreglo con todas los lugares
              return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            }));  
            
        } catch (error) {
            return [];
        }

    }


    async climaLugar(lat='',lon=''){
     
        try {
            // instancia axios create
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
               params: {lat,lon, ...this.paramOpenWeather}
            });
            //resp data
            const resp = await instance.get();
            const {weather,main} = resp.data;
                                   
            return {
                desc: weather[0].description,
                min: main.temp_min ,
                max: main.temp_max ,
                temp: main.temp

            }

        } catch (error ) 
            {
                console.log(error)
            
            }
    }






}

module.exports = Busquedas;
