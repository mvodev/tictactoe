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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkIsWin = (field:BoardShape) => {
  //check by rows
  for(let row=0; row<3; row++){
    let match = 1;
    const valueToCheck = field[row][0];
    for(let column=1;column<3;column++){
      if(field[row][column]===valueToCheck){
        match++;
      } else match=0;
      if(match ===3) return valueToCheck;
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
      if(match ===3) return valueToCheck;
    }
  }
  //check diagonals
  if(field[0][0]===field[1][1]&&field[1][1]===field[2][2]) return field[0][0];
  if(field[2][0]===field[1][1]&&field[1][1]===field[0][2]) return field [2][0];
}

export const useTicTacToe = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field,setField] = useState<BoardShape>(getEmptyBoard());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [winner,setWinner] = useState<MarkedCell|null>(null);
  return {field,winner};
}