import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

// Pass the theme as a prop
export function Collapsible({
  children,
  title,
  myTheme, // Accept themed styles here
}: PropsWithChildren & { title: string; myTheme: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView
      style={[
        styles.body,
        { backgroundColor: myTheme.paymentLetterBackground }, // Apply theme background
      ]}
    >
      <TouchableOpacity
        style={[
          styles.heading,
          { backgroundColor: myTheme.paymentLetterBackground }, // Apply theme background
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={myTheme.icon} // Apply theme color
        />
        <ThemedText type="CollapseTitle">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  body: {
    marginBottom: 24,
    padding: 10,
    borderRadius: 10,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderBottomWidth: 3,
  },
});
