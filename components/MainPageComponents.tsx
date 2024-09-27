import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function PaymentLetter({
  participantsNumber,
  participantAmount,
  participantTip,
  totalAmount,
  totalTip,
  totalPrice,
}: any) {
  return (
    <View style={styles.PaimentLetter}>
      <Text style={styles.headerText}>Payment letter</Text>

      <View style={styles.bodyContainer}>
        <View style={styles.sectionContainer}>
          <Text>Amount:</Text>
          <Text>${totalAmount}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text>Tip:</Text>
          <Text>${totalTip}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.bodyText}>Number of Participants:</Text>
          <Text>{participantsNumber}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.bodyText}>Participant Amount:</Text>
          <Text>${participantAmount}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.bodyText}>Participant Tip:</Text>
          <Text>${participantTip}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.resultsText}>Total Amount = ${totalPrice}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PaimentLetter: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    margin: 20,
    backgroundColor: "#f7f7f7",
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
    fontSize: 30,
    color: "#00cba9",
    fontWeight: "bold",
    paddingBottom: 20,
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
  },
  sectionContainer: {
    flexDirection: "row", // Aligns items in a row
    justifyContent: "space-between", // Puts space between the title and value
    alignItems: "center", // Aligns them vertically centered
    marginVertical: 5, // Optional: Adds space between rows
  },
  bodyText: {
    fontSize: 16,
    color: "#000000",
  },
  resultsText: {
    textAlign: "right",
    fontSize: 20,
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
    fontWeight: "semibold",
  },
});
