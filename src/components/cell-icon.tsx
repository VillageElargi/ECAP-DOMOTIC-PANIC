import { CELLS } from "@/data/cells";
import { ITEMS_IMAGES } from "@/data/images";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

interface CellIconProps {
  pos: { x: number; y: number };
  isOn: boolean;
}

const CellIcon = ({ pos, isOn }: CellIconProps) => {
  const cellData = CELLS.find((cell) => cell.x === pos.x && cell.y === pos.y);
  const { t } = useTranslation();

  if (!cellData) return null;

  const img = ITEMS_IMAGES[`${cellData.image}_${isOn ? "on" : "off"}`];

  return (
    <View pointerEvents="none" style={styles.container}>
      <Image source={img} style={styles.image} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.item}>
          {t(cellData.item)}
        </Text>

        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.position}>
          {t(cellData.position)}{" "}
          {cellData.position_nb != 0 && cellData.position_nb}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  image: {
    width: "70%",
    height: "70%",
    position: "absolute",
    top: -5,
    alignSelf: "center",
  },
  textContainer: {
    position: "absolute",
    left: 2,
    right: 2,
    bottom: "8%",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  item: {
    color: "#F0F9FF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  position: {
    color: "#7DD3FC",
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
  },
});

export default CellIcon;
