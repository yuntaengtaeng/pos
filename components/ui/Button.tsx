import { Color, Radius, Spacing, Typography } from "@/design-token";
import { ColorValue } from "@/design-token/color";
import React from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";
import Typo from "./Typo";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends Omit<PressableProps, "style"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: React.ReactNode;
  style?: ViewStyle;
}

const Button = ({
  onPress,
  disabled,
  children,
  size = "medium",
  variant = "primary",
  style,
  ...props
}: ButtonProps) => {
  const sizeStyles = {
    small: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      typography: Typography.label.md,
    },
    medium: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      typography: Typography.body.md,
    },
    large: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      typography: Typography.body.lg,
    },
  };

  const getVariantStyles = (pressed: boolean): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: Radius.md,
      alignItems: "center",
      justifyContent: "center",
      opacity: pressed ? 0.7 : 1,
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: Color.Neutral.B50,
      };
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          backgroundColor: Color.Brand.PRIMARY,
        };
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: Color.Neutral.B600,
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: Color.Neutral.WHITE,
          borderWidth: 1,
          borderColor: Color.Brand.PRIMARY,
        };
      case "ghost":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
        };
      default:
        return baseStyles;
    }
  };

  const getTextColor = (): ColorValue => {
    if (disabled) {
      return Color.Neutral.B900;
    }

    switch (variant) {
      case "primary":
      case "secondary":
        return Color.Neutral.WHITE;
      case "outline":
      case "ghost":
        return Color.Brand.PRIMARY;
      default:
        return Color.Neutral.WHITE;
    }
  };

  const currentSize = sizeStyles[size];
  const textColor = getTextColor();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        getVariantStyles(pressed),
        {
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        style,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Typo
          variant={currentSize.typography}
          color={textColor}
          style={{
            fontWeight: "700",
          }}
        >
          {children}
        </Typo>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
