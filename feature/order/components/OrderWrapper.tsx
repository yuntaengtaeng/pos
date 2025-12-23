import { Color, Spacing } from "@/design-token";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type OrderWrapperProps = {
  isSelected?: boolean;
  controls?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
} & Omit<PressableProps, "style" | "children">;

const OrderWrapper = ({
  isSelected = false,
  controls,
  children,
  style,
  ...rest
}: OrderWrapperProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? Color.Neutral.B100
            : Color.Neutral.WHITE,
        },
        style,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {isSelected && controls && (
          <View style={styles.controls}>{controls}</View>
        )}
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  content: {
    gap: Spacing.sm,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default OrderWrapper;
