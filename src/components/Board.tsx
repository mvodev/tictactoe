
import { type PointerEvent } from 'react';
import styles from './Board.module.css';
import { type BoardShape } from '../hooks/useTicTacToe';
interface Props {
  currentBoard:BoardShape|null
}

const Board = ({ currentBoard }: Props) => {
  
  const handleClick = (event:PointerEvent<HTMLDivElement>)=>{
    const eventTarget = event.target as HTMLDivElement 
    console.log(eventTarget.dataset);
  }
  
  return (
    <>
      <main onPointerDown={handleClick} className={styles.gameroot}>
        {currentBoard?.map((row,rowIndex) => {
          return row.map((_,columnIndex) => 
            <div 
              key={columnIndex+rowIndex}
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
