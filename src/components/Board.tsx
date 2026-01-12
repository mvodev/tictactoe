
import type { PointerEvent } from 'react';
import styles from './Board.module.css';
import { useTicTacToe } from '../hooks/useTicTacToe';

const Board = () => {
  const {field} = useTicTacToe();
  console.log(field);
  const handleClick = (event:PointerEvent<HTMLDivElement>)=>{
    const eventTarget = event.target as HTMLDivElement 
    console.log(eventTarget.dataset);
  }
  
  return (
    <>
      <main onPointerDown={handleClick} className={styles.gameroot}>
        {field.map((row,rowIndex) => {
          return row.map((_,columnIndex) => 
            <div 
              data-row={rowIndex} 
              data-column={columnIndex} 
              className={styles.field}>
            </div>)
        })}
      </main>
    </>
  )
}

export default Board;
