export type BoardState = boolean[];

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function createEmptyBoard(size: number): BoardState {
  return Array(size * size).fill(false);
}

export function toggleCell(
  board: BoardState,
  row: number,
  col: number,
  size: number,
): BoardState {
  const nextBoard = [...board];

  const positions = [
    [row, col], // La case cliquée
    [row - 1, col], // En haut
    [row + 1, col], // En bas
    [row, col - 1], // À gauche
    [row, col + 1], // À droite
  ];

  for (const [r, c] of positions) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      const index = r * size + c;
      nextBoard[index] = !nextBoard[index];
    }
  }

  return nextBoard;
}

export function hasWon(board: BoardState): boolean {
  return board.every((cell) => cell);
}

export function generateRandomCode() {
  const length = Math.floor(Math.random() * 5) + 4;
  const code = Array.from({ length }, () =>
    CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length)),
  ).join("");

  return code;
}
