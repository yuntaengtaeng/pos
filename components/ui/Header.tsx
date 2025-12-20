import { NAV_ITEMS } from "@/constants/nav";
import { Color, Spacing, Typography as TypographyTokens } from "@/design-token";
import { Href, router, usePathname } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import CloseIcon from "../icon/CloseIcon";
import MenuIcon from "../icon/MenuIcon";
import Typo from "./Typo";

const Header = () => {
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu";

  const handleMenuPress = () => {
    if (isMenuPage) {
      router.back();
    } else {
      router.push("/menu");
    }
  };

  const handleNavItemPress = (path: string) => {
    if (pathname === path) {
      return;
    }

    router.replace(path as Href);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={handleMenuPress}
          activeOpacity={0.7}
          style={styles.iconButton}
        >
          {isMenuPage ? (
            <CloseIcon size={24} color={Color.Neutral.WHITE} />
          ) : (
            <MenuIcon size={24} color={Color.Neutral.WHITE} />
          )}
        </TouchableOpacity>

        <View style={styles.navItems}>
          {NAV_ITEMS.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <Pressable
                key={path}
                onPress={() => handleNavItemPress(path)}
                style={styles.navItem}
              >
                <Typo
                  variant={TypographyTokens.body.lg}
                  color={isActive ? Color.Neutral.WHITE : Color.Neutral.B600}
                >
                  {label}
                </Typo>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    backgroundColor: Color.Neutral.B900,
    paddingHorizontal: Spacing.md,
    zIndex: 50,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.md,
  },
  iconButton: {
    padding: Spacing.xs,
  },
  navItems: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  navItem: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
});

export default Header;
