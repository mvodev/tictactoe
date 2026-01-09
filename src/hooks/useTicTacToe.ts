import { useState } from "react";

type EmptyCell  = 'Empty';

type MarkedCell = 'Circle'|'Cross';

type CellState = MarkedCell | EmptyCell;

type BoardShape = CellState[][];

const getEmptyBoard = ():BoardShape => {
  const emptyCell:EmptyCell = 'Empty';
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(emptyCell));
}

const randomBot = (field:BoardShape) => {
  let row:number;
  let column:number;
  while(true){
    row = Math.floor(Math.random()*3);
    column = Math.floor(Math.random()*3);
    if(field[row][column] === 'Empty') {
      return {row,column}
    }
  }
}

export const useTicTacToe = () => {
  
  const [field,setField] = useState<BoardShape>(getEmptyBoard());
  console.log(randomBot(field))
  return {field};
}