import { useCallback, useEffect, useState } from "react";

type EmptyCell  = 'Empty';

type MarkedCell = 'Circle'|'Cross'|'CircleWin'|'CrossWin';

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
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const possibleMoves = () => {
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

const enemyMove = (moves:{row:number,column:number}[],itemToRemove : {row:number,column:number})=>{
  const indexToRemove = moves.findIndex((value)=>
    value.row===itemToRemove.row && value.column===itemToRemove.column);
  if(indexToRemove>=-1) moves.splice(indexToRemove, 1);
  return moves.pop();
}

const isEmptyField = (row:number,column:number,field:BoardShape) => {
  if(field[row][column] ==='Empty') return true;
  return false;
}

type WhoWin = {
  whoWin:MarkedCell;
  parameter:'row'|'column'|'diagonal';
  parameterValue:number;
}

const markWinnerCells = (field:BoardShape,whoWin:WhoWin) => {

}

const checkIsWin = (field:BoardShape):WhoWin|null => {
  //check by rows
  for(let row=0; row<3; row++){
    let match = 1;
    const valueToCheck = field[row][0];
    for(let column=1;column<3;column++){
      if(field[row][column]===valueToCheck){
        match++;
      } else match=0;
      if(match ===3 && valueToCheck!=='Empty') {return {whoWin:valueToCheck,parameter:'row',parameterValue:row}};
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
      if(match ===3 && valueToCheck!=='Empty') return {whoWin:valueToCheck,parameter:'column',parameterValue:column};
    }
  }
  //check diagonals
  if(field[0][0]===field[1][1]&&field[1][1]===field[2][2]&&field[0][0]!=='Empty') return {whoWin:field[0][0] as MarkedCell,parameter:'diagonal',parameterValue:2};
  if(field[2][0]===field[1][1]&&field[1][1]===field[0][2]&&field[2][0]!=='Empty') return {whoWin:field[2][0] as MarkedCell,parameter:'diagonal',parameterValue:0};
  return null;
}

export const useTicTacToe = () => {
  const [board,setBoard] = useState<BoardShape>(getEmptyBoard());
  const [isPlaying,setIsPlaying] = useState(false);
  const [winner,setWinner] = useState<MarkedCell|null>(null);
  const [enemyMoves,setEnemyMoves] = useState(possibleMoves());

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setEnemyMoves(possibleMoves())
    setBoard(getEmptyBoard());
    setWinner(null);
  },[setIsPlaying,setWinner,setBoard,setEnemyMoves]);

  const stopGame = useCallback(() => {
    setIsPlaying(false);
    setBoard(getEmptyBoard());
    setWinner(null);
  },[setBoard,setIsPlaying,setWinner]);

  const onHandleClick = useCallback((event:PointerEvent):void => {
    const target = event.target as HTMLElement;
    if(isPlaying && target.dataset.id==='tictactoe'){
      const { row, column } = target.dataset;
      const newBoardState = structuredClone(board);
      if(row && column && !winner &&
          isEmptyField(Number(row),Number(column),newBoardState)) {
        newBoardState[Number(row)][Number(column)] = 'Circle';
        setBoard(newBoardState);
        if(checkIsWin(newBoardState)) {
          setWinner(checkIsWin(newBoardState)!.whoWin)
        }
        if(!winner) {
          const move = enemyMove(enemyMoves,{row:Number(row),column:Number(column)});
          if(move) newBoardState[move.row][move.column] = 'Cross';
            setBoard(newBoardState);
        }
        if(checkIsWin(newBoardState)) {
          setWinner(checkIsWin(newBoardState)!.whoWin)
        }
      }
    }
  },[board,isPlaying,winner,enemyMoves])

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
    stopGame,
    isPlaying,
  };
}