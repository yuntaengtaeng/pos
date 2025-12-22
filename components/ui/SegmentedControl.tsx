import { Color, Radius, Spacing, Typography } from "@/design-token";
import React, { useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Typo from "./Typo";

type Props = {
  selectedIndex: number;
  onChange: (index: number) => void;
  labels: string[];
  style?: ViewStyle;
};

const SegmentedControl = ({
  selectedIndex,
  onChange,
  labels,
  style,
}: Props) => {
  const containerRef = useRef<View>(null);
  const buttonLayouts = useRef<{ x: number; width: number }[]>([]);

  const sliderLeft = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  useEffect(() => {
    const layout = buttonLayouts.current[selectedIndex];
    if (!layout) return;

    sliderLeft.value = withTiming(layout.x, { duration: 250 });
    sliderWidth.value = withTiming(layout.width, { duration: 250 });
  }, [selectedIndex, sliderLeft, sliderWidth]);

  const handleButtonLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    buttonLayouts.current[index] = { x, width };

    if (index === selectedIndex) {
      sliderLeft.value = x;
      sliderWidth.value = width;
    }
  };

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderLeft.value }],
    width: sliderWidth.value,
  }));

  return (
    <View ref={containerRef} style={[styles.container, style]}>
      <Animated.View style={[styles.slider, sliderStyle]} />
      {labels.map((label, index) => (
        <Pressable
          key={label}
          onLayout={(e) => handleButtonLayout(index, e)}
          onPress={() => onChange(index)}
          style={styles.button}
        >
          <Typo
            variant={Typography.label.sm}
            color={
              index === selectedIndex ? Color.Neutral.B900 : Color.Neutral.B500
            }
          >
            {label}
          </Typo>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: Radius.md,
    padding: Spacing.xs,
    backgroundColor: Color.Neutral.GRAY,
    flexDirection: "row",
    position: "relative",
    alignSelf: "flex-start",
  },
  slider: {
    position: "absolute",
    height: 24,
    backgroundColor: Color.Neutral.WHITE,
    borderRadius: Radius.md,
    bottom: Spacing.xs,
  },
  button: {
    position: "relative",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
});

export default SegmentedControl;
