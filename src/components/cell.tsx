import { Pressable, StyleSheet, View } from "react-native";
import CellIcon from "./cell-icon";

type CellProps = {
  isOn: boolean;
  pos: { x: number; y: number };
  onPress: () => void;
};

export default function Cell({ isOn, pos, onPress }: CellProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Case ${pos.x + 1}, ${pos.y + 1}, ${
        isOn ? "allumée" : "éteinte"
      }`}
      accessibilityState={{ selected: isOn }}
      style={({ pressed }) => [
        styles.cell,
        isOn && styles.cellOn,
        pressed && styles.pressed,
      ]}
    >
      <CellIcon pos={pos} isOn={isOn} />

      <View
        pointerEvents="none"
        style={[styles.cache, isOn ? styles.on : styles.off]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    height: "100%",
    margin: 2,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#0B1424",
    borderWidth: 1,
    borderColor: "#26374B",
  },
  cellOn: {
    borderColor: "#38BDF8",
    borderWidth: 2,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  pressed: {
    opacity: 0.82,
  },
  cache: {
    ...StyleSheet.absoluteFill,
    borderRadius: 8,
    zIndex: 1,
  },
  on: {
    backgroundColor: "rgba(56, 189, 248, 0.16)",
  },
  off: {
    backgroundColor: "transparent",
  },
});
