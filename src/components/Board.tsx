
import styles from './Board.module.css';
import { type BoardShape } from '../hooks/useTicTacToe';

interface Props {
  currentBoard:BoardShape|null;
}

const Board = ({ currentBoard }: Props) => {
  
  return (
    <>
      <main className={styles.gameroot}>
        {currentBoard?.map((row,rowIndex) => {
          return row.map((value,columnIndex) => 
            <div 
              
              data-id="tictactoe"
              key={columnIndex+rowIndex}
              data-row={rowIndex} 
              data-column={columnIndex} 
              className={
                `${styles.field} 
                  ${value==='Circle'
                    ? styles.circle : value==='Cross'
                    ? styles.cross : ''}`}>
            </div>)
        })}
      </main>
    </>
  )
}

export default Board;
