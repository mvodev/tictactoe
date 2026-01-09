import { useState } from "react";

export type EmptyCell  = 'Empty';

export type MarkedCell ='Circle'|'Cross';

export type CellState = MarkedCell | EmptyCell;

export type BoardShape = CellState[][];

export const getEmptyBoard = ():BoardShape => {
  const emptyCell:EmptyCell = 'Empty';
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(emptyCell));
}

export const useTicTacToe = () => {
  const [field,setField] = useState<BoardShape>(getEmptyBoard());
  return {field,setField};
}