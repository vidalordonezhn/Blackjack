;(() => {
  'use strict'

  let deck = []
  const types = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K']

  let puntosJugadores = []

  // referencias del html
  const btnPedir = document.querySelector('#btnPedir'),
    btnNuevo = document.querySelector('#btnNuevo'),
    btnDetener = document.querySelector('#btnDetener')

  const puntosHTML = document.querySelectorAll('small'),
    divCartasJugadores = document.querySelectorAll('.divCartas')

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck()

    puntosJugadores = []
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0)
    }

    puntosHTML.forEach((element) => (element.innerText = 0))
    divCartasJugadores.forEach((element) => (element.innerHTML = ''))

    btnDetener.disabled = false
    btnPedir.disabled = false
  }

  // esta funcion crea un nuevo deck
  const crearDeck = () => {
    deck = []
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
    return _.shuffle(deck)
  }

  //  esta funcion me permite tomar una carta
  const pedirCarta = () => {
    deck.length === 0 && inicializarJuego()
    return deck.pop()
  }

  // esta funcion me permite tomar una carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1
  }

  const acuntarPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
    puntosHTML[turno].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta)
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie Gana')
      } else if (puntosMinimos > 21) {
        alert('Computadora Gana')
      } else if (puntosComputadora > 21) {
        alert('Jugador Gana')
      } else {
        alert('Computadora Gana')
      }
    })
  }

  const notificacionesGanador = (puntosComputadora, puntosMinimos) => {
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

  //turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0
    do {
      const carta = pedirCarta()

      let Jugador = puntosJugadores.length - 1
      puntosComputadora = acuntarPuntos(carta, Jugador)
      crearCarta(carta, Jugador)
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)

    notificacionesGanador(puntosComputadora, puntosMinimos)
  }

  //eventos del Juego
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    const puntosJugador = acuntarPuntos(carta, 0)
    crearCarta(carta, 0)

    if (puntosJugador > 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    }
  })

  btnDetener.addEventListener('click', (turno) => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugadores[0])
  })

  btnNuevo.addEventListener('click', () => {
    inicializarJuego()
  })

  return {
    nuevoJuego: inicializarJuego,
  }
})()
