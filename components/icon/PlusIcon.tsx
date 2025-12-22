import { Color } from "@/design-token";
import { Path, Svg } from "react-native-svg";
import { IconProps } from "./type";

const PlusIcon = ({
  size = 24,
  color = Color.Neutral.B900,
  ...props
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 5V19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;

