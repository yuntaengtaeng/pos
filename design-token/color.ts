import { ValueOf } from "@/utils/type";

const Color = {
  Neutral: {
    B50: "#F8F8FF",
    B100: "#F3F3FF",
    B200: "#ECECFF",
    B300: "#DFDEFD",
    B400: "#BCBCD9",
    B500: "#9D9DB9",
    B600: "#73748F",
    B700: "#5F607A",
    B900: "#1E2036",
    GRAY: "#F8F8F8",
    WHITE: "#ffffff",
  },
  Brand: {
    PRIMARY: "#8E48FF",
  },
  Semantic: {
    Success: "#35CB00",
    SuccessBg: "rgba(113, 255, 64, 0.25)",

    Error: "#FF2897",
    ErrorBg: "rgba(255, 40, 151, 0.10)",

    Warning: "#FFB341",
    WarningBg: "rgba(255, 179, 65, 0.10)",
  },
} as const;

export type ColorValue =
  | ValueOf<typeof Color.Neutral>
  | ValueOf<typeof Color.Brand>
  | ValueOf<typeof Color.Semantic>;

export default Color;
