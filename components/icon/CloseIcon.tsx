import { Color } from "@/design-token";
import { Path, Svg } from "react-native-svg";
import { IconProps } from "./type";

const CloseIcon = ({
  size = 24,
  color = Color.Neutral.B900,
  ...props
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
        fill={color}
      />
    </Svg>
  );
};

export default CloseIcon;
