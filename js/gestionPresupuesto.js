// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO

    if(typeof num === 'number' && num >= 0)
    {
        presupuesto = num;
        return presupuesto;
    }
    else
    {
       
        let menor = -1;
        console.log("Has inatroducido un número menor a cero");
        return menor;
    }

    

}

function mostrarPresupuesto() {
    // TODO

    
    return(`Tu presupuesto actual es de ${presupuesto} €`);
  

}

function CrearGasto(descripcion, valor, fecha = Date.now() , ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    
    if(valor >= 0 && typeof valor === "number")
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.actualizarDescripcion = function(desc)
    {
        this.descripcion = desc;
    },

   this.actualizarValor = function(val)
    {
       if(typeof val == "number" && val >= 0)
       {
        this.valor = val;
       }
    },

    this.etiquetas = [...etiquetas];

    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
       this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    this.mostrarGastoCompleto = function()
    {
        let tex
         tex = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
         
         let fec = new Date(this.fecha);
         tex = tex + `Fecha: ${fec.toLocaleString()}\n`;
         tex = tex + `Etiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length; i++)
        {
            tex = tex + `- ${this.etiquetas[i]}\n`;
        }

        return tex;



    },


    this.actualizarFecha = function(fec)
    {

        if(!isNaN(Date.parse(fec)) && typeof fec === "string")
        {
            this.fecha = Date.parse(fec);
        }

    },

    this.borrarEtiquetas = function(...etiquet)
    {
        let e = [...etiquet]
        for(let i = 0; i < e.length; i++)
        {
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(e[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j, 1);

                }
            }
        }
    },


    this.anyadirEtiquetas = function(...etiquet)
    {

        let e = [...etiquet];
       
        for(let i = 0; i < e.length; i++)
        {
            let exist = false;
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(e[i] === this.etiquetas[j])
                {
                    exist = true;
                }
               
            }

            if(exist === false)
             {
            this.etiquetas.push(e[i]);
            }
            
        }
        
    },

    this.obtenerPeriodoAgrupacion = function(period)
    {

        let tot = "";
        let fec = new Date(this.fecha);

        if(period === 'anyo')
       {
        tot = (fec.getFullYear(this.fecha));
       }


       if(period === 'dia')
       {
        tot = fec.getFullYear(this.fecha) + "-"; 
        if(fec.getMonth(this.fecha)+1 <10)
        {
            tot += ("0" + (fec.getMonth(this.fecha) + 1) + "-")
        }
        else
        {
            tot += ((fec.getMonth(this.fecha) + 1) + "-")
        }
        if((fec.getDate(this.fecha) + 1) < 10)
        {
            
            tot += ( "0" + fec.getDate(this.fecha));
        }
        else
        {
            tot += (fec.getDate(this.fecha));
        }
       }

       
    if(period === 'mes')
    {
        tot += fec.getFullYear(this.fecha);
     if((fec.getMonth(this.fecha) + 1) < 10)
     {
     tot +=  "-"+"0" + ((fec.getMonth(this.fecha) + 1)) 
     }
     else
     {
         tot += ("-" + (fec.getMonth(this.fecha) + 1))  
     }
    }

       return tot;

    }

}

function listarGastos(){
    return (gastos)
}

function anyadirGasto(gasto1){

    gasto1.id = idGasto;
    idGasto++;
    gastos.push(gasto1);

    
}

function borrarGasto(id){

   
for(let i = 0; i < gastos.length; i++)
{

    if(gastos[i].id === id)
    {
        gastos.splice(i, 1);
    }
   
}

}

function calcularTotalGastos(){

   let tot = 0;

   for(let i = 0; i < gastos.length; i++)
   {

        tot = tot + gastos[i].valor;

   }

   return tot;

}

function calcularBalance(){

    let tot = 0;
    let gas = calcularTotalGastos();
    tot = presupuesto - gas;

    return tot;

}



function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){

let arrayFiltrado = gastos.filter(function(gasto){

    let anyadir = true;
    let cont = 0;
   
    if(fechaDesde)
    {
        if(gasto.fecha <  Date.parse(fechaDesde))
        {
        anyadir = false;
        }
    }

    if(fechaHasta)
    {
    if(gasto.fecha > Date.parse(fechaHasta))
        {
        anyadir = false
        }
    }

    if(valorMinimo)
    {
        if(gasto.valor < valorMinimo)
        {
            anyadir = false;
        }
    }

    if(valorMaximo)
    {
        if(gasto.valor > valorMaximo)
        {
            anyadir = false;
        }
    }

    
    if(descripcionContiene)
    {
        let des1 = gasto.descripcion.toLowerCase();
        let des2 = descripcionContiene.toLowerCase();
        
        if(!des1.includes(des2))
        {
            anyadir = false;
        }
    }
   

    

    let etiq = false;

    if(etiquetasTiene)
    {
    for(let i = 0; i < etiquetasTiene.length; i++)
    {
        for(let j = 0; j < gasto.etiquetas.length; j++)
        {
            if(etiquetasTiene[i].toLowerCase() === gasto.etiquetas[j].toLowerCase())
            {
                etiq = true;
            }
           
        }
    }
    if(!etiq){
        anyadir = false;
    }
    }
    
    
        return anyadir;

});

return arrayFiltrado;

}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta){
    
let objeto = {
    fechaDesde:fechaDesde, 
    fechaHasta:fechaHasta, 
    etiquetasTiene:etiquetas
};

let filtro = filtrarGastos(objeto);

 let tot = filtro.reduce(function(acumulator, gasto){

    if(!acumulator.hasOwnProperty(gasto.obtenerPeriodoAgrupacion(periodo)))
    {
        acumulator[gasto.obtenerPeriodoAgrupacion(periodo)] = gasto.valor;
    }
    else
    acumulator[gasto.obtenerPeriodoAgrupacion(periodo)] += gasto.valor;
   
    return acumulator;

}, {});
 
return tot;


}


function transformarListadoEtiquetas(etiq)
{
    let etiqueta =  etiq;
    let filt = etiqueta.match(/[0-9a-z]+/gi)
    return filt;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        
        gastos.push(gastoRehidratado)
    }
}
    



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
