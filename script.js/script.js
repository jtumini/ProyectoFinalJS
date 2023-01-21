const formulario = document.getElementById("formulario")
const boton = document.getElementById("btnApuesta")
const btn = document.getElementById("btn")


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
const Francia = 1.72
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
        ganador = "Francia"
        ganancia = parseInt(calcularApuesta(apuesta,Francia)) 
    }else{
        ganador = "Empate"
        ganancia = parseInt(calcularApuesta(apuesta,Empate))
    }
    let apuestaNueva = new goles(local, visitante, apuesta,ganador,ganancia);
    listaApuestas.push(apuestaNueva);
    localStorage.setItem("apuestas",JSON.stringify(listaApuestas));
    return listaApuestas;
}



const promedioApuestas = () => { 
    let sumaEl = listaApuestas.reduce((total, listaApuestas) => {
        return total + parseInt(listaApuestas.local) +  parseInt(listaApuestas.visitante)
    }, 0)
    let cantidadEl = listaApuestas.length  
    let promedio = Math.round(sumaEl / cantidadEl);
    divApuestas.innerHTML += `<div class='apuestas'><h3>El promedio de goles por apuesta es de:${promedio}</h3></div>`
}

// const mostrarApuestas = () => { 
//     listaApuestas.forEach (goles => {
//         divApuestas.innerHTML += `
//             <div class='apuestas'>
//             <h3>Tu apuesta por $${goles.apuesta} a Argentina:${goles.local} - Francia:${goles.visitante} 
//             . tiene una Ganancia de: $${goles.ganancia}</h3>
//             </div>
//             `
//     })
// }
const mostrarApuestas = () => {
    divApuestas.innerHTML = ""
    listaApuestas.forEach (goles => {
        divApuestas.innerHTML += `
            <div class='apuestas'>
            <h3>Tu apuesta por $${goles.apuesta} a Argentina:${goles.local} - Francia:${goles.visitante} 
            . tiene una Ganancia de: $${goles.ganancia}</h3>
            </div>
        `
    })
}
//////////////////// VALIDACION Y SUBMIT DEL FORMULARIO ////////////////////
const form = document.getElementById('form');

formulario.addEventListener('submit', event => {
    event.preventDefault();
    const local = document.getElementById("local").value;
    const visitante = document.getElementById("visitante").value;
    const apuesta = document.getElementById("apuesta").value;
    validateForm(local, visitante, apuesta)
        .then(() => {
            event.preventDefault();
            Swal.fire({
                title: 'Apuesta Realizada',
                icon: 'success'
            });
            nuevaApuesta();
            mostrarApuestas();
            promedioApuestas();
        })
        .catch(error => {
            Swal.fire({
                title: 'Debes completar todos los campos',
                icon: 'error',
            });
        }); 
    });

const validateForm = (local, visitante, apuesta) => {
    return new Promise((resolve, reject) => {
        if (!local || !visitante || !apuesta) {
            reject('Todos los campos son necesarios');
        } else if (isNaN(local) || isNaN(visitante) || isNaN(apuesta)) {
            reject('Los campos deben contener solo numeros');
        } else {
            resolve();
        }
    });
}
//////////////////////////////////////////////////////////////
// promedioApuestas();
// mostrarApuestas();
