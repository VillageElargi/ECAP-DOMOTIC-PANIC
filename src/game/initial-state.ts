import { type BoardState } from "./logic";

export function createPuzzle(size: number): BoardState {
  const board: BoardState = Array(size * size).fill(false);

  const initialCells: [number, number][] = [
    [0, 0],
    [0, 3],
    [1, 2],
    [2, 2],
    [2, 1],
    [3, 0],
  ];

  for (const [row, col] of initialCells) {
    board[row * size + col] = true;
  }

  return board;
}
