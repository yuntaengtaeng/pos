import { SvgProps } from "react-native-svg";

export interface IconProps extends Omit<SvgProps, "fill" | "stroke"> {
  size?: number;
  color?: string;
}
