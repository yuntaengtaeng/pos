import { ValueOf } from "@/utils/type";

const Typography = {
  display: {
    lg: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "700",
    },
    md: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "700",
    },
  },

  heading: {
    xl: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: "700",
    },
    lg: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "600",
    },
    md: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: "600",
    },
    sm: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
  },

  body: {
    lg: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
    },
    md: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: "400",
    },
    sm: {
      fontSize: 13,
      lineHeight: 20,
      fontWeight: "400",
    },
  },

  label: {
    md: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "500",
    },
    sm: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "400",
    },
  },
} as const;

export type TypographyVariant =
  | ValueOf<typeof Typography.display>
  | ValueOf<typeof Typography.body>
  | ValueOf<typeof Typography.heading>
  | ValueOf<typeof Typography.label>;

export default Typography;
