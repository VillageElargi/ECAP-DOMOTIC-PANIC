import { ITEMS_IMAGES } from "@/data/images";
import { Asset } from "expo-asset";

export async function preloadImages() {
  const images = Object.values(ITEMS_IMAGES).filter(Boolean);

  await Asset.loadAsync(images);
}
