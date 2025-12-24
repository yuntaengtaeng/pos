import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

interface UseItemWidthOptions {
  columns: number;
  gap: number;
}

const useItemWidth = ({ columns, gap }: UseItemWidthOptions) => {
  const [width, setWidth] = useState(0);

  const itemWidth = width > 0 ? (width - gap * (columns - 1)) / columns : 0;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  return {
    itemWidth,
    onLayout,
  };
};

export default useItemWidth;
