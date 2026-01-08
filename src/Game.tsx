
import type { PointerEvent } from 'react';
import styles from './Game.module.css';

const Game = () => {
  const handleClick = (event:PointerEvent<HTMLElement>)=>{
    const eventTarget = event.target as HTMLDivElement 
    console.log(eventTarget.id);
  }
  return (
    <>
      <h1 className={styles.header}>TicTacToe Game</h1>
      <main onPointerDown={handleClick} className={styles.gameroot}>
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
