import CloseIcon from "@/components/icon/CloseIcon";
import MenuIcon from "@/components/icon/MenuIcon";
import MinusIcon from "@/components/icon/MinusIcon";
import PlusIcon from "@/components/icon/PlusIcon";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import Typography from "@/components/ui/Typo";
import { Color, Spacing, Typography as TypographyTokens } from "@/design-token";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Display */}
      <View style={styles.section}>
        <Typography
          variant={TypographyTokens.label.md}
          color={Color.Neutral.B600}
        >
          Display
        </Typography>
        <Typography variant={TypographyTokens.display.lg}>
          Display Large (28px)
        </Typography>
        <Typography variant={TypographyTokens.display.md}>
          Display Medium (24px)
        </Typography>
      </View>

      {/* Heading */}
      <View style={styles.section}>
        <Typography
          variant={TypographyTokens.label.md}
          color={Color.Neutral.B600}
        >
          Heading
        </Typography>
        <Typography variant={TypographyTokens.heading.xl}>
          Heading XL (22px)
        </Typography>
        <Typography variant={TypographyTokens.heading.lg}>
          Heading Large (20px)
        </Typography>
        <Typography variant={TypographyTokens.heading.md}>
          Heading Medium (18px)
        </Typography>
        <Typography variant={TypographyTokens.heading.sm}>
          Heading Small (16px)
        </Typography>
      </View>

      {/* Body */}
      <View style={styles.section}>
        <Typography
          variant={TypographyTokens.label.md}
          color={Color.Neutral.B600}
        >
          Body
        </Typography>
        <Typography variant={TypographyTokens.body.lg}>
          Body Large (16px) - 본문 텍스트의 큰 사이즈입니다.
        </Typography>
        <Typography variant={TypographyTokens.body.md}>
          Body Medium (14px) - 본문 텍스트의 기본 사이즈입니다.
        </Typography>
        <Typography variant={TypographyTokens.body.sm}>
          Body Small (13px) - 본문 텍스트의 작은 사이즈입니다.
        </Typography>
      </View>

      {/* Label */}
      <View style={styles.section}>
        <Typography
          variant={TypographyTokens.label.md}
          color={Color.Neutral.B600}
        >
          Label
        </Typography>
        <Typography variant={TypographyTokens.label.md}>
          Label Medium (12px)
        </Typography>
        <Typography variant={TypographyTokens.label.sm}>
          Label Small (11px)
        </Typography>
      </View>

      {/* Color Examples */}
      <View style={styles.section}>
        {/* Neutral Colors */}
        <View style={styles.section}>
          <Typography
            variant={TypographyTokens.heading.lg}
            color={Color.Neutral.B900}
          >
            Neutral Colors
          </Typography>
          <View style={styles.colorGrid}>
            {Object.entries(Color.Neutral).map(([name, value]) => (
              <View key={name}>
                <Typography
                  variant={TypographyTokens.label.sm}
                  color={Color.Neutral.B900}
                >
                  {name}
                </Typography>
                <View style={[styles.colorCard, { backgroundColor: value }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Brand Colors */}
        <View style={styles.section}>
          <Typography
            variant={TypographyTokens.heading.lg}
            color={Color.Neutral.B900}
          >
            Brand Colors
          </Typography>
          <View style={styles.colorGrid}>
            {Object.entries(Color.Brand).map(([name, value]) => (
              <View key={name}>
                <Typography
                  variant={TypographyTokens.label.sm}
                  color={Color.Neutral.B900}
                >
                  {name}
                </Typography>
                <View style={[styles.colorCard, { backgroundColor: value }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Semantic Colors */}
        <View style={styles.section}>
          <Typography
            variant={TypographyTokens.heading.lg}
            color={Color.Neutral.B900}
          >
            Semantic Colors
          </Typography>
          <View style={styles.colorGrid}>
            {Object.entries(Color.Semantic).map(([name, value]) => (
              <View key={name}>
                <Typography
                  variant={TypographyTokens.label.sm}
                  color={Color.Neutral.B900}
                >
                  {name}
                </Typography>
                <View style={[styles.colorCard, { backgroundColor: value }]} />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Button Examples */}
      <View style={styles.section}>
        <Typography
          variant={TypographyTokens.label.md}
          color={Color.Neutral.B600}
        >
          Buttons
        </Typography>
        <View style={styles.buttonRow}>
          <Button size="small" onPress={() => {}}>
            작은 버튼
          </Button>
          <Button size="medium" onPress={() => {}}>
            중간 버튼
          </Button>
          <Button size="large" onPress={() => {}}>
            큰 버튼
          </Button>
        </View>
        <View style={styles.buttonRow}>
          <Button variant="primary" onPress={() => {}}>
            Primary
          </Button>
          <Button variant="secondary" onPress={() => {}}>
            Secondary
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Outline
          </Button>
          <Button variant="ghost" onPress={() => {}}>
            Ghost
          </Button>
        </View>
        <View style={styles.buttonRow}>
          <Button onPress={() => {}}>둥근 버튼</Button>
          <Button disabled onPress={() => {}}>
            비활성화
          </Button>
        </View>
      </View>
      <View>
        <Tabs
          selectedIndex={tabIndex}
          onSelectHandler={(index) => {
            setTabIndex(index);
          }}
          menu={["test1", "test2", "나는 좀 긴 텍스트야"]}
        />
      </View>
      <MenuIcon />
      <CloseIcon />
      <MinusIcon />
      <PlusIcon />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.WHITE,
  },
  contentContainer: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },

  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  colorCard: {
    width: 120,
    height: 120,
    alignItems: "center",
  },
});
