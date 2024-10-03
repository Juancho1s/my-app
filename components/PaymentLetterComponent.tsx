import { Colors, theme } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";

export default function PaymentLetter({
  participantsNumber,
  participantAmount,
  participantTip,
  totalAmount,
  totalTip,
  totalPrice,
}: any) {
  const [myTheme, setMyTheme] = useState(Colors.light); // default to light theme

  const systemTheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      const loadContext = async () => {
        const storedTheme = await theme(systemTheme as "light" | "dark");
        setMyTheme(Colors[storedTheme as "light" | "dark"]);
      };
      loadContext();
    }, [])
  );

  return (
    <View
      style={[
        styles.PaimentLetter,
        { backgroundColor: myTheme.paymentLetterBackground },
      ]}
    >
      <Text style={styles.headerText}>Payment letter</Text>

      <View style={styles.bodyContainer}>
        <View style={styles.sectionContainer}>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            Amount:
          </Text>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            ${totalAmount}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>Tip:</Text>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            ${totalTip}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            Number of Participants:
          </Text>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            {participantsNumber}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            Participant Amount:
          </Text>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            ${participantAmount}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            Participant Tip:
          </Text>
          <Text style={[styles.bodyText, { color: myTheme.text }]}>
            ${participantTip}
          </Text>
        </View>
      </View>

      <View>
        <Text style={[styles.resultsText, { color: myTheme.text }]}>
          Total Amount = ${totalPrice}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PaimentLetter: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#cccccc",
    shadowColor: "#00cba9", // iOS only
    shadowRadius: 5, // iOS only
    shadowOpacity: 5, // iOS only
    shadowOffset: { width: 0, height: 0 }, // iOS only
    elevation: 5, // Android shadow
  },
  headerText: {
    textAlign: "center",
    fontSize: 40,
    color: "#00cba9",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 203, 169, .5)",
    textShadowRadius: 5,
  },
  bodyContainer: {
    borderRadius: 10,
    borderBlockColor: "#cccccc",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 20,
  },
  sectionContainer: {
    flexDirection: "row", // Aligns items in a row
    justifyContent: "space-between", // Puts space between the title and value
    alignItems: "center", // Aligns them vertically centered
    marginVertical: 5, // Optional: Adds space between rows
  },
  bodyText: {
    fontSize: 18,
  },
  resultsText: {
    textAlign: "right",
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#00cba9",
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  saveButtonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
