import Typo from "@/components/ui/Typo";
import { Color, Radius, Spacing, Typography } from "@/design-token";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

type MenuItemProps = {
  name: string;
  price: number;
  style?: ViewStyle;
} & Omit<PressableProps, "children" | "style">;

const MenuItem = ({ name, price, style, ...rest }: MenuItemProps) => {
  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <Typo variant={Typography.heading.sm}>{name}</Typo>
      <Typo variant={Typography.body.md}>{price.toLocaleString()}원</Typo>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Neutral.B200,
    gap: Spacing["2xl"],
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
});

export default MenuItem;
