let empezarJuego = document.querySelector("#botonComenzar");
empezarJuego.addEventListener("click", function () {
  let nombre = prompt("Introduce tu nombre:");
  Swal.fire(`¡Buena suerte, ${nombre}!`);
  let baraja = [];
  crearBaraja(baraja);
  baraja = barajar(baraja);

  let listaCartas = [];
  listaCartas = todasLasCartas(listaCartas, baraja);

  partida(listaCartas, baraja, nombre);
  bancaSacarCarta(baraja);
  resetear();
});

//FUNCIONES
function partida(listaCartas, baraja, nombre) {
  let suma = 0;
  let vueltas = 0;
  let puntosJugador = 0;
  let contador = 0;

  let intervalo = setInterval(() => {
    if (suma < 17) {
      suma += listaCartas[vueltas].valor;
      vueltas++;
      console.log(listaCartas[vueltas - 1].imagen);
      let cuadroCartaBanca = document.querySelector(
        `#cartaBanca${vueltas - 1}`
      );
      cuadroCartaBanca.innerHTML = `<img src="${
        listaCartas[vueltas - 1].imagen
      }" style="width:100%; height:100%">`;
      let puntosBanca = document.querySelector("#marcadorBanca");
      puntosBanca.textContent = `${suma}`;
    } else {
      clearInterval(intervalo);
      if (suma >= 17 && suma < 22) {
        Swal.fire(`Es tu turno, ${nombre}`);
        let pedirCarta = document.querySelector("#botonPedirCarta");
        pedirCarta.addEventListener("click", function () {
          let cuadroCartaJugador = document.querySelector(
            `#cartaJugador${contador}`
          );
          cuadroCartaJugador.innerHTML = `<img src="${baraja[0].imagen}" style="width:100%; height:100%">`;
          puntosJugador += baraja[0].valor;
          let marcador = document.querySelector("#marcadorJugador");
          marcador.textContent = `${puntosJugador}`;
          contador++;
          baraja.shift();
        });

        let plantarse = document.querySelector("#botonPlantarse");
        plantarse.addEventListener("click", function () {
          balancePuntos(suma, puntosJugador, nombre);
          contador = 0;
        });
      } else {
        balancePuntos(suma, puntosJugador, nombre);
        contador = 0;
      }
    }
  }, 2000);
}

function crearBaraja(baraja) {
  let palos = ["C", "T", "P", "D"];
  let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  for (let index = 0; index < palos.length; index++) {
    for (let i = 0; i < numeros.length; i++) {
      let card = new carta(numeros[i] + palos[index]);
      baraja.push(card);
    }
  }
  return baraja;
}

function barajar(baraja) {
  baraja = _.shuffle(baraja);
  return baraja;
}

function todasLasCartas(listaCartas, baraja) {
  for (let index = 0; index < baraja.length; index++) {
    listaCartas[index] = baraja[index];
  }
  return listaCartas;
}

function bancaSacarCarta(barajaCartas) {
  let conteo = 0;
  let cartasSacadas = 0;
  for (let i = 0; i < barajaCartas.length; i++) {
    if (conteo < 17) {
      conteo += barajaCartas[i].valor;
      cartasSacadas++;
    } else {
      break;
    }
  }
  for (let index = 0; index < cartasSacadas; index++) {
    barajaCartas.shift();
  }
  return conteo;
}

function balancePuntos(puntosBanca, puntosJugador, nombreJugador) {
  if (puntosBanca >= 22) {
    Swal.fire({
      title: `¡Has ganado, ${nombreJugador}!`,
      text: "La Banca se ha pasado de 21 puntos",
      imageUrl: "./images/images/contento.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Cara triste",
    });
    return 2;
  } else if (puntosBanca > puntosJugador && puntosBanca < 22) {
    Swal.fire({
      title: "Ha ganado la Banca :(",
      imageUrl: "./images/images/triste.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Cara triste",
    });
    return 2;
  } else if (puntosJugador >= 22) {
    Swal.fire({
      title: `Ha ganado la Banca :(`,
      text: "Te has pasado de 21 puntos...",
      imageUrl: "./images/images/triste.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Cara triste",
    });
    return 2;
  } else if (puntosBanca < puntosJugador && puntosJugador < 22) {
    Swal.fire({
      title: `¡Has ganado, ${nombreJugador}!`,
      imageUrl: "./images/images/contento.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Cara contenta",
    });
    return true;
  } else {
    Swal.fire({
      title: `Ha habido empate`,
      imageUrl: "./images/images/empate.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Cara empate",
    });
    return 2;
  }
}

function resetear() {
  for (let index = 0; index < 6; index++) {
    let cuadroCartaBanca = document.querySelector(`#cartaBanca${index}`);
    cuadroCartaBanca.innerHTML = "";
  }
  for (let i = 0; i < 6; i++) {
    let cuadroCartaJugador = document.querySelector(`#cartaJugador${i}`);
    cuadroCartaJugador.innerHTML = "";
  }
  let puntosBanca = document.querySelector("#marcadorBanca");
  puntosBanca.textContent = "";
  let marcador = document.querySelector("#marcadorJugador");
  marcador.textContent = "";
}
