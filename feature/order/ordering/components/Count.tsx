import MinusIcon from "@/components/icon/MinusIcon";
import PlusIcon from "@/components/icon/PlusIcon";
import Typo from "@/components/ui/Typo";
import { Color, Radius, Spacing, Typography } from "@/design-token";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  minusHandler: () => void;
  count: number;
  pluseHandler: () => void;
};

const Count = ({ count, minusHandler, pluseHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={minusHandler}>
        <MinusIcon size={24} />
      </Pressable>
      <Typo variant={Typography.body.lg}>{count}</Typo>
      <Pressable onPress={pluseHandler}>
        <PlusIcon size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.lg,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Color.Neutral.GRAY,
    borderRadius: Radius.md,
    alignSelf: "flex-start",
    backgroundColor: Color.Neutral.WHITE,
  },
});

export default Count;
