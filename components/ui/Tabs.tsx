import { Color, Spacing, Typography } from "@/design-token";
import React from "react";
import { LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Typo from "./Typo";

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menu: string[];
}

const Tabs = ({ selectedIndex, onSelectHandler, menu }: Props) => {
  const tabLayouts = React.useRef<{ x: number; width: number }[]>([]).current;

  const translateX = useSharedValue(0);
  const underlineWidth = useSharedValue(0);

  React.useEffect(() => {
    const layout = tabLayouts[selectedIndex];
    if (!layout) return;

    translateX.value = withSpring(layout.x, { duration: 250 });
    underlineWidth.value = withSpring(layout.width, { duration: 250 });
  }, [selectedIndex, tabLayouts, translateX, underlineWidth]);

  const handleTabLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    tabLayouts[index] = { x, width };

    if (index === selectedIndex) {
      translateX.value = x;
      underlineWidth.value = width;
    }
  };

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: underlineWidth.value,
  }));

  return (
    <View
      style={{
        position: "relative",
        flexDirection: "row",
        backgroundColor: Color.Neutral.WHITE,
        gap: Spacing.md,
      }}
    >
      {/* underline */}
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            height: 2,
            backgroundColor: Color.Brand.PRIMARY,
          },
          underlineStyle,
        ]}
      />

      {menu.map((v, i) => (
        <Pressable
          key={v}
          onLayout={(e) => handleTabLayout(i, e)}
          onPress={() => onSelectHandler(i)}
          style={{
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.sm,
          }}
        >
          <Typo
            variant={Typography.body.lg}
            color={
              selectedIndex === i ? Color.Brand.PRIMARY : Color.Neutral.B900
            }
          >
            {v}
          </Typo>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;
