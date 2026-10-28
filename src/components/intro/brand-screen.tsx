import { useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

type Props = {
  onComplete: () => void;
};

export default function BrandScreen({ onComplete }: Props) {
  const player = useAudioPlayer(require("@/assets/nexora-jingle.mp3"));

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const symbolScale = useRef(new Animated.Value(0.2)).current;
  const symbolRotation = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.6)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordY = useRef(new Animated.Value(16)).current;
  const glow = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    let mounted = true;

    player.seekTo(0);
    player.play();

    const symbolAnimation = Animated.parallel([
      Animated.spring(symbolScale, {
        toValue: 1,
        speed: 7,
        bounciness: 5,
        useNativeDriver: true,
      }),
      Animated.timing(symbolRotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    const ringAnimation = Animated.parallel([
      Animated.timing(ringOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(ringScale, {
        toValue: 1.35,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    const wordAnimation = Animated.sequence([
      Animated.delay(350),
      Animated.parallel([
        Animated.timing(wordOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(wordY, {
          toValue: 0,
          duration: 650,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]);

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    symbolAnimation.start();
    ringAnimation.start();
    wordAnimation.start();
    glowAnimation.start();

    const finishTimer = setTimeout(() => {
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && mounted) {
          onComplete();
        }
      });
    }, 2750);

    return () => {
      mounted = false;
      clearTimeout(finishTimer);

      symbolAnimation.stop();
      ringAnimation.stop();
      wordAnimation.stop();
      glowAnimation.stop();

      player.pause();
    };
  }, [
    onComplete,
    player,
    contentOpacity,
    symbolScale,
    symbolRotation,
    ringScale,
    ringOpacity,
    wordOpacity,
    wordY,
    glow,
  ]);

  const rotation = symbolRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-45deg", "0deg"],
  });

  const haloScale = ringScale.interpolate({
    inputRange: [0.6, 1.35],
    outputRange: [0.6, 1.35],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.halo,
          {
            opacity: Animated.multiply(ringOpacity, glow),
            transform: [{ scale: haloScale }],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.outerRing,
          {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />

      <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
        {/* Symbole NEXORA */}
        <Animated.View
          style={[
            styles.symbol,
            {
              opacity: symbolScale,
              transform: [{ scale: symbolScale }, { rotate: rotation }],
            },
          ]}
        >
          <View style={styles.symbolInner} />
          <View style={styles.symbolCore} />
        </Animated.View>

        {/* Nom de marque */}
        <Animated.View
          style={{
            opacity: wordOpacity,
            transform: [{ translateY: wordY }],
            alignItems: "center",
          }}
        >
          <Text style={styles.wordmark}>NEXORA</Text>

          <View style={styles.divider}>
            <View style={styles.dividerDot} />
          </View>

          <Text style={styles.tagline}>INTELLIGENT LIVING</Text>
        </Animated.View>

        <Animated.Text style={[styles.status, { opacity: glow }]}>
          CONNECTING YOUR WORLD
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050914",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  halo: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#38BDF8",
    shadowColor: "#38BDF8",
    shadowOpacity: 0.9,
    shadowRadius: 70,
    elevation: 18,
  },
  outerRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#38BDF866",
  },
  symbol: {
    width: 78,
    height: 78,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#7DD3FC",
    backgroundColor: "#0C2035",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    shadowColor: "#38BDF8",
    shadowOpacity: 0.7,
    shadowRadius: 22,
    elevation: 12,
  },
  symbolInner: {
    width: 34,
    height: 34,
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    borderRadius: 10,
    transform: [{ rotate: "45deg" }],
  },
  symbolCore: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0F2FE",
  },
  wordmark: {
    color: "#F0F9FF",
    fontSize: 38,
    fontWeight: "300",
    letterSpacing: 11,
    marginLeft: 11,
  },
  divider: {
    width: 100,
    height: 1,
    backgroundColor: "#38BDF866",
    marginTop: 12,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#7DD3FC",
  },
  tagline: {
    color: "#7DD3FC",
    fontSize: 10,
    letterSpacing: 5,
  },
  status: {
    color: "#fff5",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 8,
  },
});
