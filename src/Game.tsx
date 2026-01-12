
import styles from './Game.module.css';
import Board from './components/Board';

const Game = () => {
  
  return (
    <>
      <h1 className={styles.header}>TicTacToe Game</h1>
      <Board />
    </>
  )
}

export default Game
