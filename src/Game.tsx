
import styles from './Game.module.css';

const Game = () => {

  return (
    <>
      <h1>TicTacToe Game</h1>
      <main className={styles.gameroot}>
        <div className={styles.field} id='1-1'></div>
        <div className={styles.field} id='1-2'></div>
        <div className={styles.field} id='1-3'></div>
        <div className={styles.field} id='2-1'></div>
        <div className={styles.field} id='2-2'></div>
        <div className={styles.field} id='2-3'></div>
        <div className={styles.field} id='3-1'></div>
        <div className={styles.field} id='3-2'></div>
        <div className={styles.field} id='3-3'></div>
      </main>
    </>
  )
}

export default Game
