import Typo from "@/components/ui/Typo";
import { Color, Radius, Spacing, Typography } from "@/design-token";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

type Props = {
  name: string;
  style?: ViewStyle;
} & Omit<PressableProps, "children" | "style">;

const PaymentOption = ({ name, style, ...rest }: Props) => {
  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <Typo variant={Typography.heading.sm}>{name}</Typo>
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

export default PaymentOption;
