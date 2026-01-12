
import styles from './Game.module.css';
import Board from './components/Board';
import { useTicTacToe } from './hooks/useTicTacToe';

const Game = () => {
  const {board} = useTicTacToe(null,null,null);
  return (
    <>
      <h1 className={styles.header}>TicTacToe Game</h1>
      <Board currentBoard={board}/>
    </>
  )
}

export default Game
