import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  mainText: string;
  disabled?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  secondText?: string;
  onPress: () => void;
}

const Button = ({
  mainText,
  disabled = false,
  active = false,
  icon,
  secondText,
  onPress,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.disabled,
        active && styles.active,
      ]}
      disabled={disabled}
    >
      {icon && icon}

      <View style={styles.textContainer}>
        <Text style={[styles.first, disabled && styles.disabledText]}>
          {mainText}
        </Text>

        {secondText && (
          <Text style={[styles.second, disabled && styles.disabledText]}>
            {secondText}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff0f",
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  disabled: {
    backgroundColor: "#ffffff0f",
    opacity: 0.6,
  },
  active: { backgroundColor: "#458aaf" },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  first: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
  second: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
  disabledText: {
    color: "#999999",
  },
});

export default Button;
