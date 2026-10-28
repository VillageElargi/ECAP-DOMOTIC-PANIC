import { StyleSheet, View } from "react-native";
import type { BoardState } from "../game/logic";
import Cell from "./cell";

type BoardProps = {
  board: BoardState;
  size: number;
  onCellPress: (row: number, col: number) => void;
};

export default function Board({ board, size, onCellPress }: BoardProps) {
  return (
    <View style={styles.board}>
      {Array.from({ length: size }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: size }, (_, col) => {
            const index = row * size + col;

            return (
              <Cell
                key={col}
                isOn={board[index]}
                pos={{ x: col, y: row }}
                onPress={() => onCellPress(row, col)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0,
    gap: 5,
    marginBottom: 5,
    maxHeight: "22%",
    width: "100%",
    alignItems: "stretch",
  },
});
