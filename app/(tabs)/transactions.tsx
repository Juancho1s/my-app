import { Collapsible } from "@/components/Collapsible";
import Header from "@/components/Header";
import { Colors, theme } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface Transaction {
  id: number; // or whatever type the id is
  participants: number; // assuming participants is a number
  amount: Float; // assuming amount is a number
  tip: Float; // assuming tip is a number
  price: Float; // total price of the whole transaction
  date: Date; // assuming date is a string (format like ISO or other)
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [myTheme, setMyTheme] = useState(Colors.light); // default to light theme

  const systemTheme = useColorScheme();

  const transactionsHistory = async () => {
    const data = await AsyncStorage.getItem("transactions");
    if (data) {
      return JSON.parse(data); // Parse the JSON data before returning
    }
    return [];
  };

  const clearTransactions = async () => {
    try {
      await AsyncStorage.removeItem("transactions");
      console.log("Item Entirelly removed");
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchContext = async () => {
        const history = await transactionsHistory();
        const storedTheme = await theme(systemTheme as "light" | "dark");

        setTransactions(history);
        setMyTheme(Colors[storedTheme as "light" | "dark"]);
      };

      fetchContext();
    }, [])
  ); // Empty dependency array to run only on mount

  return (
    <View style={[styles.container, { backgroundColor: myTheme.background }]}>
      <ScrollView>
        <Header pageTitle="Transactions" myTheme={myTheme} />

        <View style={styles.bodyContainer}>
          <FlatList
            data={transactions} // Pass the transactions array to the FlatList
            renderItem={({ item }) => (
              <Collapsible title={item.date + ""} myTheme={myTheme}>
                <View
                  style={[
                    styles.reportBody,
                    { backgroundColor: myTheme.background },
                  ]}
                >
                  <View
                    style={{
                      paddingBottom: 20,
                      borderColor: "#cccccc",
                      borderBottomWidth: 3,
                      borderRadius: 10,
                    }}
                  >
                    <View style={styles.report}>
                      <Text style={styles.itemText}>
                        Number of participants:
                      </Text>
                      <Text style={styles.itemText}>{item.participants}</Text>
                    </View>
                    <View style={styles.report}>
                      <Text style={styles.itemText}>Amount:</Text>
                      <Text style={styles.itemText}>${item.amount}</Text>
                    </View>
                    <View style={styles.report}>
                      <Text style={styles.itemText}>Added Tip:</Text>
                      <Text style={styles.itemText}>${item.tip}</Text>
                    </View>
                  </View>
                  <View
                    style={[styles.report, { justifyContent: "space-around" }]}
                  >
                    <Text style={styles.transactionResultText}>
                      Total Price:
                    </Text>
                    <Text style={styles.transactionResultText}>
                      ${item.price}
                    </Text>
                  </View>
                </View>
              </Collapsible>
            )}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={clearTransactions}
            >
              <Text style={styles.buttonText}>Delete All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 20,
    color: "#00cba9",
    fontWeight: "bold",
  },
  transactionResultText: {
    fontSize: 25,
    color: "#00cba9",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  reportBody: {
    flex: 1,
    paddingHorizontal: 30,
    paddingRight: 60,
    paddingVertical: 20,
  },
  report: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});

export default Transactions;
