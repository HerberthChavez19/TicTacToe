import { useState } from "react"

/*Es un array de los turnos que habran*/
const TURNS = {
  X: 'x',
  O: 'o'
}

/*??????????????????????????????????????????????????????????????????????????*/
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

/*Son las posibles combinaciones que hacen que un jugador gane.*/
const winner_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const check_winner = (boardToCheck) => {
  for (const combo of winner_combos) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] == boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  return null;
}



function App() {

  //Estados

  /*State, que: tiene como parametro inicial que toda la tabla no este llena. 
  Board -> Estado de la tabla. 
  setBoard -> "Interruptor que sirve para cambiar de estado la tabla."*/
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  /*Estado que nos indica que jugador es el siguiente turno. Siempre comenzara el jugador con el turno 'X'*/
  const [turn, setTurn] = useState(TURNS.X)
  /*Estado que nos indica que jugador es el siguiente turno. Comienza sin que haya un ganador.*/
  const [winner, setWinner] = useState(null)

  /*Resetea el juego. Con los valores originales.*/
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  /*???????????????????????????????????????????????????????????????????*/
  /*Seteando los valores de los elementos de los states.*/
  const updateBoard = (index) => {

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    /*Si va el jugador 'x' (condicion), el siguiente turno es el jugador 'O', sino, va el jugador 'X'*/
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    /*
    Setea el ganador
    La constanten nuevo ganador, es igual a la funcion checkWinner con parametro que es la actual tabla.
    */
    const newWinner = check_winner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>TicTacToe</h1>
      <button onClick={resetGame}>Resetear juego</button>

      <section className="game">
        {/* MAPEO???????????????????????????????????????/// */}
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Gano: '
                }
              </h2>
              {/* Al momento de terminar el juego, nos despliega la ventana. Y nos indica el jugador que gano */}
              <header className="win">
                {/* Si hay un ganador, nnos muestra el jugador que gano*/}
                {winner && <Square>{winner}</Square>}
              </header>

              {/* Al momento de terminar el juego, nos despliega la ventana. Y nos indica si queremos empezar de nuevo*/}
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
