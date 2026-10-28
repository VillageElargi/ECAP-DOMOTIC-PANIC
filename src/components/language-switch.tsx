import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language.split("-")[0];

  return (
    <View
      style={styles.container}
      accessibilityRole="radiogroup"
      accessibilityLabel="Choisir la langue"
    >
      {LANGUAGES.map((language) => {
        const active = currentLanguage === language.code;

        return (
          <Pressable
            key={language.code}
            onPress={() => {
              void i18n.changeLanguage(language.code);
            }}
            accessibilityRole="radio"
            accessibilityLabel={language.label}
            accessibilityState={{ selected: active }}
            hitSlop={4}
            style={({ pressed }) => [
              styles.option,
              active && styles.activeOption,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>
              {language.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 3,
    gap: 2,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#26364B",
    backgroundColor: "#080F1C",
  },
  option: {
    minWidth: 34,
    height: 30,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeOption: {
    backgroundColor: "#102338",
    borderBottomColor: "#38BDF8",
  },
  label: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  activeLabel: {
    color: "#BAE6FD",
  },
  pressed: {
    opacity: 0.7,
  },
});
