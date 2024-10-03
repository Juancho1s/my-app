import Ionicons from "@expo/vector-icons/Ionicons";
import { Collapsible } from "@/components/Collapsible";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useState } from "react";

import Header from "@/components/Header";
import { useFocusEffect } from "expo-router";
import { Colors, theme } from "@/constants/Colors";
import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

export default function TabTwoScreen() {
  const [percent, setPercent] = useState("");
  const [myTheme, setMyTheme] = useState(Colors.light); // default to light theme

  // Fetch percentage from AsyncStorage when the component mounts
  useFocusEffect(
    React.useCallback(() => {
      const loadPercent = async () => {
        try {
          const storedPercent = await AsyncStorage.getItem("percent");
          const storedTheme = await AsyncStorage.getItem("selectedTheme");
          if (storedPercent) {
            setPercent(storedPercent);
            setMyTheme(Colors[storedTheme as "light" | "dark"]);
          }
        } catch (error) {
          console.error("Failed to load percent:", error);
        }
      };

      loadPercent();
    }, [])
  );

  const selectTheme = async (value: any) => {
    try {
      await AsyncStorage.setItem("selectedTheme", value);
      setMyTheme(Colors[value as "light" | "dark"]);
    } catch (error) {
      console.error("Failed to save selected theme:", error);
    }
  };

  // Validate and set the percentage, store it in AsyncStorage
  const validateAndSet = async (value: any) => {
    const regex = /^\d*\.?\d{0,2}$/; // Allows up to two decimal places
    if (regex.test(value)) {
      setPercent(value);
      try {
        await AsyncStorage.setItem("percent", value);
      } catch (error) {
        console.error("Failed to save percent:", error);
      }
    }
  };

  return (
    <SafeAreaView
      style={[styles.saveContainer, { backgroundColor: myTheme.background }]}
    >
      <ScrollView>
        <View style={styles.mainContainer}>
        <Header
              pageTitle="Settings"
              myTheme={myTheme}
            />

          <View style={styles.body}>
            <View>
              <Text style={styles.bodyLabel}>Default tip percentage:</Text>
              <TextInput
                style={[
                  styles.textBoxes,
                  { backgroundColor: myTheme.paymentLetterBackground },
                ]}
                placeholder="Tip percentage %"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                value={percent}
                onChangeText={validateAndSet} // Store the value in AsyncStorage on change
              />
            </View>

            <Collapsible title={"Themes"} myTheme={myTheme}>
              <View
                style={[
                  styles.collapsibleBody,
                  { backgroundColor: myTheme.paymentLetterBackground },
                ]}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    selectTheme("dark");
                  }}
                >
                  <Ionicons name="cafe" size={24} color="black" />
                  <Text style={styles.buttonText}>Dark</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    selectTheme("light");
                  }}
                >
                  <Ionicons name="cafe-outline" size={24} color="#00cba9" />
                  <Text style={styles.buttonText}>Light</Text>
                </TouchableOpacity>
              </View>
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#151718",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  imageHeader: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 128,
    height: 128,
    marginTop: -90,
  },
  headerText: {
    textAlign: "center",
    fontSize: 50,
    color: "#00cba9",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 203, 169, 1)",
    textShadowRadius: 5,
    paddingTop: 20,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  collapsibleBody: {
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#00cba9",
    marginLeft: 10,
    fontWeight: "bold",
  },

  bodyLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00cba9",
    marginBottom: 10,
  },
  textBoxes: {
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    borderColor: "#cccccc",
    borderBottomWidth: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    color: "#00cba9",
    backgroundColor: "#f7f7f7",
  },
});
