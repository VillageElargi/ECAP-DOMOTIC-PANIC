import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import LanguageSwitch from "../language-switch";

type Props = {
  onConnect: () => void;
};

export default function ConnectScreen({ onConnect }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;
  const { t } = useTranslation();

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>NEXORA SYSTEMS</Text>

      <View style={styles.ring}>
        <Animated.View
          style={[styles.button, { transform: [{ scale: pulse }] }]}
        >
          <Pressable
            onPress={onConnect}
            style={styles.pressable}
            accessibilityRole="button"
            accessibilityLabel={t("connect")}
          >
            <Text style={styles.symbol}>⌁</Text>

            <Text style={styles.title}>{t("connect")}</Text>

            <Text style={styles.hint}>{t("click_continue")}</Text>
          </Pressable>
        </Animated.View>
      </View>
      <View style={{ marginTop: 40 }}>
        <LanguageSwitch />
      </View>

      <Text style={styles.footer}>SMART HOME INTERFACE // V.04.2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050914",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  eyebrow: {
    color: "#7DD3FC",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 5,
    marginBottom: 48,
  },
  ring: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "#38BDF855",
    backgroundColor: "#38BDF808",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#0C2035",
    borderWidth: 2,
    borderColor: "#38BDF8",
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#38BDF8",
    shadowOpacity: 0.5,
    shadowRadius: 28,
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  symbol: {
    color: "#7DD3FC",
    fontSize: 44,
    marginBottom: 8,
  },
  title: {
    color: "#F0F9FF",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 23,
    textAlign: "center",
  },
  hint: {
    color: "#7DD3FC",
    fontSize: 8,
    letterSpacing: 1.4,
    marginTop: 14,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    color: "#52647B",
    fontSize: 10,
    letterSpacing: 2,
  },
});
