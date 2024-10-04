import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  useColorScheme,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState } from "react";
import { useFocusEffect } from "expo-router";

import PaymentLetter from "@/components/PaymentLetterComponent";

import Header from "@/components/Header";
import { Colors, theme } from "@/constants/Colors";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [participantsNumber, setParticipantsNumber] = useState("1");
  const [myTheme, setMyTheme] = useState(Colors.light); // default to light theme

  const systemTheme = useColorScheme();

  // Load the percent value when the tab is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadPercent = async () => {
        try {
          const storedTheme = await theme(systemTheme as "light" | "dark");
          const storedPercentage = await AsyncStorage.getItem("percent");
          if (storedPercentage !== null) {
            setPercent(storedPercentage);
          }
          setMyTheme(Colors[storedTheme as "light" | "dark"]);
        } catch (error) {
          console.error("Failed to load theme:", error);
        }
      };
      loadPercent();
    }, [])
  );

  const validateAndSet = (value: any, setValue: any) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      setValue(value);
    }
  };

  function onAddingParticipant() {
    setParticipantsNumber((prev) => "" + (parseFloat(prev) + 1));
  }
  function onRemovingParticipant() {
    if (parseInt(participantsNumber) > 1) {
      setParticipantsNumber((prev) => "" + (parseFloat(prev) - 1));
    }
  }

  const toatlTip = (amount: any, percent: any) => {
    let total = (percent / 100) * amount;
    return total.toFixed(2);
  };
  const eachParticipantAmount = (participantsNumber: any, amount: any) => {
    let eachPerson = amount / participantsNumber;
    return eachPerson.toFixed(2);
  };
  const eachParticipantTip = (
    participantsNumber: any,
    amount: any,
    percent: any
  ) => {
    let eachPerson = ((percent / 100) * amount) / participantsNumber;
    return eachPerson.toFixed(2);
  };
  const totalPrice = (amount: any, percent: any) => {
    amount = parseFloat(amount);
    let total = (amount * (100 + parseFloat(percent))) / 100;
    return total ? total.toFixed(2) : amount ? amount : "0.00";
  };

  const generateTransaction = async () => {
    if (!amount) {
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      participants: parseInt(participantsNumber),
      amount: parseFloat(amount),
      tip: parseFloat(toatlTip(amount, percent)),
      price: parseFloat(totalPrice(amount, percent)),
      date: new Date().toISOString(),
    };

    try {
      // Get the current list of transactions
      const storedTransactions = await AsyncStorage.getItem("transactions");
      var transactions = [];
      if (storedTransactions !== null) {
        transactions = JSON.parse(storedTransactions); // Parse the existing transactions
      }
      // Ensure transactions is an array
      if (!Array.isArray(transactions)) {
        transactions = [];
      }
      // Append the new transaction
      transactions.push(newTransaction);
      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
      alert("Your transaction was correctly processed!!")

      setAmount("")
      setPercent("")
      setParticipantsNumber("1")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.saveContainer, { backgroundColor: myTheme.background }]}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.mainContainer}>
            <Header pageTitle="TIP Sr" myTheme={myTheme} />
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  style={[
                    styles.textBoxes,
                    { backgroundColor: myTheme.paymentLetterBackground },
                  ]}
                  placeholder="Introduce total cost"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  value={amount}
                  onChangeText={(value) => validateAndSet(value, setAmount)}
                ></TextInput>
              </View>

              <View style={styles.controlsContainer}>
                <View style={styles.participansControlContainer}>
                  <TouchableOpacity
                    style={[styles.buttons, { width: 90 }]}
                    onPress={() => onRemovingParticipant()}
                  >
                    <Text style={styles.ButtonText}>Down</Text>
                  </TouchableOpacity>
                  <Text style={styles.participantsNumber}>
                    {participantsNumber}
                  </Text>
                  <TouchableOpacity
                    style={[styles.buttons, { width: 90 }]}
                    onPress={() => onAddingParticipant()}
                  >
                    <Text style={styles.ButtonText}>Rise</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <PaymentLetter
              participantsNumber={participantsNumber}
              participantAmount={eachParticipantAmount(
                participantsNumber,
                amount
              )}
              participantTip={eachParticipantTip(
                participantsNumber,
                amount,
                percent
              )}
              totalAmount={amount ? amount : "0.00"}
              totalTip={toatlTip(amount, percent)}
              totalPrice={totalPrice(amount, percent)}
            />
            <View style={styles.payButton}>
              <TouchableOpacity
                style={[styles.buttons, { width: 200 }]}
                onPress={generateTransaction}
              >
                <Text style={styles.ButtonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveContainer: {
    flex: 1,
    backgroundColor: "#151718",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  inputContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 15,
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
  controlsContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 15,
  },
  participantsNumber: {
    fontSize: 20,
    color: "#00cba9",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 203, 169, 1)",
    textShadowRadius: 2.5,
  },
  participansControlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  buttons: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#00cba9",
    borderRadius: 10,
    padding: 20,
    shadowRadius: 2, // iOS only
    shadowOpacity: 0.7, // iOS only
    shadowOffset: { width: 0, height: 0 }, // iOS only
    elevation: 3, // Android shadow
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  payButton: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
