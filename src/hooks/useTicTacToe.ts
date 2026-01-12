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

export const useTicTacToe = (
  row:number|null,
  column:number|null,
  whichTurn:MarkedCell|null) => {
    
  const [field,setField] = useState<BoardShape>(getEmptyBoard());
  const [winner,setWinner] = useState<MarkedCell|null>(null);
  const [nextMotion,setNextMotion] = 
    useState<{row:number|null,column:number|null}>({row:null,column:null})
  if(row&&column&&whichTurn) {
    const newStateField = [...field];
    newStateField[row][column] = whichTurn;
    setField(newStateField);
    setWinner(checkIsWin(field))
    setNextMotion(randomBot(field));
    ;
  }
  return {field,winner,nextMotion};
}