/*
    Blackjack
    2C = Two of Clubs (Treboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck = []
const types = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
  puntosComputadora = 0

// referencias del html
const btnPedir = document.querySelector('#btnPedir')
const btnNuevo = document.querySelector('#btnNuevo')
const btnDetener = document.querySelector('#btnDetener')

const puntosHTML = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

// esta funcion crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of types) {
      deck.push(i + tipo)
    }
  }

  for (let tipo of types) {
    for (let esp of especiales) {
      deck.push(esp + tipo)
    }
  }

  deck = _.shuffle(deck)
  return deck
}

//  esta funcion me permite tomar una carta
const pedirCarta = () => {
  deck.length === 0 && crearDeck()
  const carta = deck.pop()
  return carta
}

// esta funcion me permite tomar una carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta()
    puntosComputadora = puntosComputadora + valorCarta(carta)
    puntosHTML[1].innerText = puntosComputadora

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasComputadora.append(imgCarta)

    if (puntosMinimos > 21) {
      break
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)

  if (puntosComputadora === puntosMinimos) {
    console.warn('Nadie Gana')
  } else if (puntosMinimos > 21) {
    console.warn('Computadora Gana')
  } else if (puntosComputadora > 21) {
    console.warn('Jugador Gana')
  } else if (puntosComputadora > puntosMinimos) {
    console.warn('Computadora Gana')
  } else if (puntosComputadora < puntosMinimos) {
    console.warn('Jugador Gana')
  } else {
    console.warn('Nadie Gana')
  }
}

//eventos del Juego
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta()
  puntosJugador = puntosJugador + valorCarta(carta)
  puntosHTML[0].innerText = puntosJugador

  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divCartasJugador.append(imgCarta)

  if (puntosJugador > 21) {
    console.warn('Perdiste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
  } else if (puntosJugador === 21) {
    console.warn('21, Ganaste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
  }
})

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', () => {
  deck = []
  deck = crearDeck()
  btnDetener.disabled = false
  btnPedir.disabled = false
  puntosComputadora = 0
  puntosJugador = 0
  puntosHTML[0].innerText = 0
  puntosHTML[1].innerText = 0
  divCartasJugador.innerHTML = ''
  divCartasComputadora.innerHTML = ''
})
