import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  code: string;
};

const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SPIN_SPEED = 45;
const STOP_DELAY = 100;
const SPIN_DURATION = 650;

export default function AnimatedCode({ code }: Props) {
  const [displayCode, setDisplayCode] = useState(code);
  const previousCode = useRef(code);

  useEffect(() => {
    if (previousCode.current === code) return;

    previousCode.current = code;

    const intervals: ReturnType<typeof setInterval>[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    setDisplayCode((current) =>
      code
        .split("")
        .map((_, i) => current[i] ?? CHARACTERS[0])
        .join(""),
    );

    for (let i = 0; i < code.length; i++) {
      const interval = setInterval(() => {
        const randomChar =
          CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

        setDisplayCode((current) => {
          const chars = current.split("");
          chars[i] = randomChar;
          return chars.join("");
        });
      }, SPIN_SPEED);

      intervals.push(interval);

      const timeout = setTimeout(
        () => {
          clearInterval(interval);

          setDisplayCode((current) => {
            const chars = current.split("");
            chars[i] = code[i];
            return chars.join("");
          });
        },
        SPIN_DURATION + i * STOP_DELAY,
      );

      timeouts.push(timeout);
    }

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [code]);

  return (
    <View style={styles.container}>
      {displayCode.split("").map((char, index) => (
        <View key={index} style={styles.characterContainer}>
          <Text style={styles.character}>{char}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  characterContainer: {
    minWidth: 13,
    alignItems: "center",
  },
  character: {
    color: "#7fa3d8",
    fontWeight: "800",
    fontSize: 16,
    fontVariant: ["tabular-nums"],
    textTransform: "uppercase",
  },
});
