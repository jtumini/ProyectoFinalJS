const formulario = document.getElementById("formulario")

// AGREGUE EL CONST DEL BOTON
const boton = document.getElementById("btn");
// AGREGUE EL CONST DEL BOTON

// AGREGUE LA ACCION DEL BOTON
boton.onclick = () => {
    Swal.fire('Any fool can use a computer')
}
// AGREGUE LA ACCION DEL BOTON

class goles {
        constructor(local, visitante, apuesta,ganador,ganancia){
            this.local = local;
            this.visitante = visitante;
            this.apuesta = apuesta;
            this.ganador = ganador;
            this.ganancia = ganancia;                   
        }
    }

const Argentina = 1.25
const Croacia = 1.72
const Empate = 3.60 

let divApuestas = document.getElementById("apuestaSemiA");
const listaApuestas = JSON.parse(localStorage.getItem("apuestas")) || [];

function calcularApuesta(apuesta,ganador){
    ganancia = (apuesta * ganador)
    return ganancia
}

const nuevaApuesta = () => {
    let local = document.getElementById("local").value;
    let visitante = document.getElementById("visitante").value;
    let apuesta = document.getElementById("apuesta").value;
    
    if(local > visitante){
        ganador = "Argentina"
        ganancia = parseInt(calcularApuesta(apuesta,Argentina)) 
    }else if(local < visitante){
        ganador = "Croacia"
        ganancia = parseInt(calcularApuesta(apuesta,Croacia)) 
    }else{
        ganador = "Empate"
        ganancia = parseInt(calcularApuesta(apuesta,Empate))
    }
    let apuestaNueva = new goles(local, visitante, apuesta,ganador,ganancia);
    listaApuestas.push(apuestaNueva);
    localStorage.setItem("apuestas",JSON.stringify(listaApuestas));
    return listaApuestas;
}




const mostrarApuestas = () => { 

    listaApuestas.forEach (goles => {
        divApuestas.innerHTML += `
            <div class='apuestas'>
            <h3>Tu apuesta por $${goles.apuesta} a Argentina:${goles.local} - Croacia:${goles.visitante} 
            . tiene una Ganancia de: $${goles.ganancia}</h3>
            </div>
            `
        
    })
}

const promedioApuestas = () => { 
    let sumaEl = listaApuestas.reduce((total, listaApuestas) => {
        return total + parseInt(listaApuestas.local) +  parseInt(listaApuestas.visitante)
    }, 0)
    let cantidadEl = listaApuestas.length  
    let promedio = Math.round(sumaEl / cantidadEl);
    divApuestas.innerHTML += `<div class='apuestas'><h3>El promedio de goles por apuesta es de:${promedio}</h3></div>`
}


formulario.onsubmit = (e) => {
    nuevaApuesta();
}

mostrarApuestas();
promedioApuestas();