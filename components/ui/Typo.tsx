import { TypographyVariant } from "@/design-token/typography";
import { ColorValue, Text, TextProps } from "react-native";

type TypoProps = {
  variant: TypographyVariant;
  color?: ColorValue;
  style?: TextProps["style"];
} & Omit<TextProps, "style">;

const Typo = ({ variant, color, style, children, ...props }: TypoProps) => {
  return (
    <Text style={[variant, color && { color }, style]} {...props}>
      {children}
    </Text>
  );
};

export default Typo;
