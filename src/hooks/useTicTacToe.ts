/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";

type EmptyCell  = 'Empty';

type MarkedCell = 'Circle'|'Cross';

type CellState = MarkedCell | EmptyCell;

export type BoardShape = CellState[][];

const getEmptyBoard = ():BoardShape => {
  const emptyCell:EmptyCell = 'Empty';
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(emptyCell));
}

const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        // Генерируем случайный индекс j от 0 до i (включительно)
        const j = Math.floor(Math.random() * (i + 1));
        // Меняем местами array[i] и array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const possibleMoves = ()=>{
  const result = Array(3)
    .fill(null)
    .map(() => Array(3).fill({row:null,column:null}));
  for(let rowIndex=0;rowIndex<result.length;rowIndex++){
    for(let columnIndex=0;columnIndex<result.length;columnIndex++){
      result[rowIndex][columnIndex] = {row:rowIndex,column:columnIndex}
    } 
  }
  return shuffleArray(result.flat());
}

const moves = possibleMoves();

const enemyMove = (itemToRemove : {row:number,column:number})=>{
  const indexToRemove = moves.findIndex((value)=>
    value.row===itemToRemove.row && value.column===itemToRemove.column);
  if(indexToRemove>=-1) moves.splice(indexToRemove, 1);
  return moves.pop();
}

const checkIsWin = (field:BoardShape):MarkedCell|null => {
  //check by rows
  for(let row=0; row<3; row++){
    let match = 1;
    const valueToCheck = field[row][0];
    for(let column=1;column<3;column++){
      if(field[row][column]===valueToCheck){
        match++;
      } else match=0;
      if(match ===3 && valueToCheck!=='Empty') return valueToCheck;
    }
  }
  //check by columns
  for(let column=0; column<3; column++){
    let match = 1;
    const valueToCheck = field[0][column];
    for(let row=1;row<3;row++){
      if(field[row][column]===valueToCheck){
        match++;
      } else match=0;
      if(match ===3 && valueToCheck!=='Empty') return valueToCheck;
    }
  }
  //check diagonals
  if(field[0][0]===field[1][1]&&field[1][1]===field[2][2]&&field[0][0]!=='Empty') return field[0][0];
  if(field[2][0]===field[1][1]&&field[1][1]===field[0][2]&&field[2][0]!=='Empty') return field [2][0];
  return null;
}

export const useTicTacToe = () => {
  const [board,setBoard] = useState<BoardShape|null>(null);
  const [isPlaying,setIsPlaying] = useState(false);
  const [winner,setWinner] = useState<MarkedCell|null>(null);
  const startGame = useCallback(() => {
    setIsPlaying(true);
    setBoard(getEmptyBoard());
  },[setIsPlaying,setBoard]);

  const onHandleClick = useCallback((event:PointerEvent):void => {
    const target = event.target as HTMLElement;
    if(isPlaying && target.dataset.id==='tictactoe'){
      const { row, column } = target.dataset;
      const newBoardState = structuredClone(board);
      if(row && column && newBoardState) {
        newBoardState[Number(row)][Number(column)] = 'Circle';
        const move = enemyMove({row:Number(row),column:Number(column)});
        if(move) newBoardState[move.row][move.column] = 'Cross';
        setBoard(newBoardState);
      }
    }
  },[board,isPlaying])

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    document.addEventListener('pointerdown', onHandleClick);
    return () => {
      document.removeEventListener('pointerdown', onHandleClick);
    };
  }, [isPlaying,onHandleClick]);

  return { 
    board, 
    winner, 
    startGame,
    isPlaying,
  };
}