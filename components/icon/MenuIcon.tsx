import { Color } from "@/design-token";
import { Path, Svg, SvgProps } from "react-native-svg";

interface IconProps extends Omit<SvgProps, "fill" | "stroke"> {
  size?: number;
  color?: string;
}

const MenuIcon = ({
  size = 24,
  color = Color.Neutral.B900,
  ...props
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
        fill={color}
      />
    </Svg>
  );
};

export default MenuIcon;
