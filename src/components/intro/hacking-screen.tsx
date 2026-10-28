import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, View } from "react-native";

type Props = {
  onComplete: () => void;
};

const COMMANDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function HackingScreen({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);
  const scanOpacity = useRef(new Animated.Value(0.12)).current;
  const { t } = useTranslation();

  useEffect(() => {
    let index = 0;

    const typingTimer = setInterval(() => {
      const line = COMMANDS[index % COMMANDS.length];
      const translation = t(`commands.${line}`);

      setLines((previous) => [...previous.slice(-10), translation]);

      index += 1;
    }, 250);

    const glitchTimer = setTimeout(() => {
      setGlitch(true);
    }, 4700);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    const scanAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanOpacity, {
          toValue: 0.4,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(scanOpacity, {
          toValue: 0.12,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    );

    scanAnimation.start();

    return () => {
      clearInterval(typingTimer);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
      scanAnimation.stop();
    };
  }, [onComplete, scanOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#FF5F57" }]} />
          <View style={[styles.dot, { backgroundColor: "#FEBC2E" }]} />
          <View style={[styles.dot, { backgroundColor: "#28C840" }]} />
        </View>

        <Text style={styles.headerText}>NEXORA // ROOT TERMINAL</Text>

        <Text style={styles.live}>● LIVE</Text>
      </View>

      <View style={styles.terminal}>
        <Text style={styles.heading}>{">> NEXORA SECURITY CONSOLE"}</Text>

        <Text style={styles.muted}>BUILD 04.2.19 — SECURE CHANNEL</Text>

        <View style={styles.separator} />

        {lines.map((line, index) => (
          <Text
            key={`${index}-${line}`}
            style={[
              styles.command,
              line.includes("AVERTISSEMENT")
                ? styles.warning
                : line.includes("SYNCHRONISATION")
                  ? styles.success
                  : undefined,
            ]}
          >
            {line}
          </Text>
        ))}

        <Text style={styles.cursor}>▋</Text>
      </View>

      <Animated.View
        pointerEvents="none"
        style={[styles.scanline, { opacity: scanOpacity }]}
      />

      {glitch && (
        <View style={styles.glitchOverlay}>
          <View style={[styles.glitchBar, styles.barOne]} />
          <View style={[styles.glitchBar, styles.barTwo]} />
          <View style={[styles.glitchBar, styles.barThree]} />

          <Text style={styles.glitchText}>SYSTEM FAILURE</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020604",
    overflow: "hidden",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#163B27",
    gap: 12,
  },
  dots: {
    flexDirection: "row",
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerText: {
    color: "#B8D7C1",
    fontSize: 11,
    flex: 1,
    letterSpacing: 1,
  },
  live: {
    color: "#4ADE80",
    fontSize: 10,
  },
  terminal: {
    padding: 22,
    paddingTop: 30,
  },
  heading: {
    color: "#86EFAC",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  muted: {
    color: "#477B58",
    fontSize: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#183C27",
    marginVertical: 22,
  },
  command: {
    color: "#4ADE80",
    fontSize: 12,
    lineHeight: 26,
    fontFamily: "monospace",
  },
  warning: {
    color: "#F87171",
    fontWeight: "800",
  },
  success: {
    color: "#7DD3FC",
    fontWeight: "800",
  },
  cursor: {
    color: "#86EFAC",
    fontSize: 17,
    marginTop: 6,
  },
  scanline: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#22C55E0A",
  },
  glitchOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#EF444418",
    alignItems: "center",
    justifyContent: "center",
  },
  glitchBar: {
    position: "absolute",
    height: 8,
    opacity: 0.8,
    backgroundColor: "#FB7185",
  },
  barOne: {
    top: "30%",
    left: 0,
    width: "85%",
  },
  barTwo: {
    top: "53%",
    right: 0,
    width: "70%",
    backgroundColor: "#38BDF8",
  },
  barThree: {
    top: "70%",
    left: "12%",
    width: "55%",
  },
  glitchText: {
    color: "#FCA5A5",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 4,
    textAlign: "center",
  },
});
