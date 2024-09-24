import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#00cba9",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    color: "#ffffff",
  },
});

export default function Button({ label, onPress }: any) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <FontAwesome name="calculator" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
}
