import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";

import Home from "@/components/home";
import BrandScreen from "@/components/intro/brand-screen";
import ConnectScreen from "@/components/intro/connect-screen";
import HackingScreen from "@/components/intro/hacking-screen";
import { preloadImages } from "@/utils/preload-images";

type Phase = "connect" | "hack" | "brand" | "home";
type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const DOUBLE_TAP_DELAY = 350;
const RESET_SEQUENCE_DELAY = 4000;
const CORNER_SIZE = 70;

export default function App() {
  const [phase, setPhase] = useState<Phase>("connect");
  const [imagesReady, setImagesReady] = useState(false);

  const lastTapRef = useRef<Record<Corner, number>>({
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  });

  const validatedCornersRef = useRef<Set<Corner>>(new Set());
  const sequenceStartRef = useRef(0);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).catch((error) => {
      console.warn("Impossible de verrouiller le paysage :", error);
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    preloadImages()
      .catch((error) => {
        console.warn("Erreur de préchargement des images :", error);
      })
      .finally(() => {
        if (mounted) {
          setImagesReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const resetApp = useCallback(() => {
    validatedCornersRef.current.clear();
    sequenceStartRef.current = 0;

    lastTapRef.current = {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    };

    setPhase("connect");
  }, []);

  const handleCornerTap = useCallback(
    (corner: Corner) => {
      const now = Date.now();

      if (
        sequenceStartRef.current !== 0 &&
        now - sequenceStartRef.current > RESET_SEQUENCE_DELAY
      ) {
        validatedCornersRef.current.clear();
        sequenceStartRef.current = 0;
      }

      if (sequenceStartRef.current === 0) {
        sequenceStartRef.current = now;
      }

      const lastTap = lastTapRef.current[corner];

      if (now - lastTap <= DOUBLE_TAP_DELAY && lastTap !== 0) {
        validatedCornersRef.current.add(corner);
        lastTapRef.current[corner] = 0;

        const allCornersValidated = validatedCornersRef.current.size === 4;

        if (allCornersValidated) {
          resetApp();
        }
      } else {
        lastTapRef.current[corner] = now;
      }
    },
    [resetApp],
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {phase === "home" ? (
        imagesReady ? (
          <Home />
        ) : null
      ) : (
        <>
          {phase === "connect" && (
            <ConnectScreen onConnect={() => setPhase("hack")} />
          )}

          {phase === "hack" && (
            <HackingScreen onComplete={() => setPhase("brand")} />
          )}

          {phase === "brand" && (
            <BrandScreen onComplete={() => setPhase("home")} />
          )}
        </>
      )}

      {/* Zones tactiles invisibles des quatre coins */}
      <Pressable
        style={[styles.corner, styles.topLeft]}
        onPress={() => handleCornerTap("topLeft")}
      />
      <Pressable
        style={[styles.corner, styles.topRight]}
        onPress={() => handleCornerTap("topRight")}
      />
      <Pressable
        style={[styles.corner, styles.bottomLeft]}
        onPress={() => handleCornerTap("bottomLeft")}
      />
      <Pressable
        style={[styles.corner, styles.bottomRight]}
        onPress={() => handleCornerTap("bottomRight")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050914",
  },
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    zIndex: 999,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
});
