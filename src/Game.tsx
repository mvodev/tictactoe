import styles from './Game.module.css';
import Board from './components/Board';
import { useTicTacToe } from './hooks/useTicTacToe';

const Game = () => {
  const {board, startGame, isPlaying} = useTicTacToe(null,null,null);
  return (
    <>
      <h1 className={styles.header}>TicTacToe Game</h1>
      {isPlaying ? (
        <Board currentBoard={board}/>
        ) : (
          <button className={styles.buttonStart} onPointerDown={startGame}>Начать игру</button>
        )}
    </>
  )
}

export default Game;
