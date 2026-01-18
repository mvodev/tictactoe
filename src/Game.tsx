import styles from './Game.module.css';
import Board from './components/Board';
import { useTicTacToe } from './hooks/useTicTacToe';

const Game = () => {
  const {board, startGame, isPlaying, stopGame,winner} = useTicTacToe();
  return (
    <>
      <h1 className={styles.header}>TicTacToe Game</h1>
      {isPlaying ? (
        <>
        <Board currentBoard={board}/>
        {winner
          ?<h5 
            className={styles.winnerHeader}>
              {winner==='Circle'||winner==='CircleWin'?'Вы победили':'Вы проиграли'}</h5>
          :null
        }
        {winner && <button className={styles.buttonControl} onPointerDown={startGame}>Сыграть еще</button>}
        {
          !winner && <button className={styles.buttonControl} onPointerDown={stopGame}>Стоп игра</button>
        }
        </>
        ) : (
          <button className={styles.buttonControl} onPointerDown={startGame}>Начать игру</button>
        )}
    </>
  )
}

export default Game;
