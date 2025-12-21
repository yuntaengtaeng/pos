import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Tabs from "../ui/Tabs";

export const CustomTopTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const menu = state.routes.map((route) => {
    const { options } = descriptors[route.key];

    const label = options.title !== undefined ? options.title : route.name;
    return label;
  });

  const onSelectHandler = (index: number) => {
    const route = state.routes[index];
    const isFocused = state.index === index;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Tabs
      selectedIndex={state.index}
      onSelectHandler={onSelectHandler}
      menu={menu}
    />
  );
};
