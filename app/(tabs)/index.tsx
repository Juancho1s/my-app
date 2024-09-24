import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  saveContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: -60,
    justifyContent: "center",
    alignContent: "center",
  },
  imageHeader: {
    justifyContent: "center",
    alignContent: "center",
    width: 128,
    height: 128,
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
  inputContainer: {
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  textBoxes: {
    fontSize: 20,
    padding: 10,
    borderColor: "#cccccc",
    borderBottomWidth: 3,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    color: "#00cba9",
  },
  saveButton: {
    backgroundColor: "#00cba9",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    color: "#ffffff",
  },
  saveButtonText: {
    fontSize: 20,
    color: "#ffffff",
  },
});

export default function Home() {
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [total, setTotal] = useState("0");

  const validateAndSet = (value: any, setValue: any) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      setValue(value);
    }
  };

  const onCalcular = () => {
    if (amount.length > 0 && percent.length > 0) {
      let cTotal = (parseFloat(amount) * (100 + parseFloat(percent))) / 100;
      setTotal(cTotal.toFixed(2));
    }
    else{
      setTotal("0")
    }
  };

  return (
    <SafeAreaView style={styles.saveContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.mainContainer}>
          <View>
            <Svg
              height={200}
              width={Dimensions.get("screen").width}
              viewBox="0 40 1440 320"
            >
              <Path
                d="M0,160L6.2,181.3C12.3,203,25,245,37,272C49.2,299,62,309,74,288C86.2,267,98,213,111,186.7C123.1,160,135,160,148,181.3C160,203,172,245,185,224C196.9,203,209,117,222,74.7C233.8,32,246,32,258,58.7C270.8,85,283,139,295,186.7C307.7,235,320,277,332,266.7C344.6,256,357,192,369,176C381.5,160,394,192,406,197.3C418.5,203,431,181,443,197.3C455.4,213,468,267,480,282.7C492.3,299,505,277,517,250.7C529.2,224,542,192,554,165.3C566.2,139,578,117,591,128C603.1,139,615,181,628,170.7C640,160,652,96,665,80C676.9,64,689,96,702,128C713.8,160,726,192,738,224C750.8,256,763,288,775,250.7C787.7,213,800,107,812,53.3C824.6,0,837,0,849,37.3C861.5,75,874,149,886,186.7C898.5,224,911,224,923,197.3C935.4,171,948,117,960,85.3C972.3,53,985,43,997,58.7C1009.2,75,1022,117,1034,128C1046.2,139,1058,117,1071,106.7C1083.1,96,1095,96,1108,96C1120,96,1132,96,1145,80C1156.9,64,1169,32,1182,26.7C1193.8,21,1206,43,1218,74.7C1230.8,107,1243,149,1255,186.7C1267.7,224,1280,256,1292,261.3C1304.6,267,1317,245,1329,229.3C1341.5,213,1354,203,1366,186.7C1378.5,171,1391,149,1403,122.7C1415.4,96,1428,64,1434,48L1440,32L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"
                stroke="#00cba9"
                strokeWidth="5"
                fill="#00cba9"
              />
            </Svg>
          </View>

          <View style={styles.header}>
            <View style={styles.imageHeader}>
              <Svg width="128" height="128" viewBox="0 0 512 512">
                <G>
                  <Circle cx="255.999" cy="256" r="251.408" fill="black" />
                  <Path
                    d="M249.275,394.2c77.299,0,139.371-62.074,139.371-138.201S326.574,117.8,249.275,117.8   c-76.127,0-138.198,62.072-138.198,138.199S173.148,394.2,249.275,394.2L249.275,394.2z"
                    fill="#FFFFFF"
                  />
                  <Path d="M249.275,319.242c35.134,0,64.415-28.106,64.415-63.243c0-35.136-29.28-63.242-64.415-63.242   c-35.136,0-63.243,28.106-63.243,63.242C186.032,291.136,214.14,319.242,249.275,319.242L249.275,319.242z" />
                  <Path
                    d="M108.735,346.179c-8.197-15.224-7.027-35.134,4.686-57.387c-19.91,28.107-26.938,55.045-15.224,72.613   c11.711,22.252,46.847,28.108,90.179,18.739c-5.855-3.515-11.711-7.028-17.567-10.541   C141.527,370.774,118.104,362.578,108.735,346.179L108.735,346.179z"
                    fill="#FFFFFF"
                  />
                  <Path
                    d="M390.987,166.989c9.371,15.226,7.027,35.136-4.684,57.389c19.908-28.107,26.937-55.045,16.396-73.783   c-12.882-22.254-48.018-26.938-90.179-18.74c5.855,3.514,11.711,7.029,17.566,11.712   C359.366,142.395,381.618,149.421,390.987,166.989L390.987,166.989z"
                    fill="#FFFFFF"
                  />
                  <Path d="M330.087,311.045c0-1.172,0-1.172,0-1.172c0-1.171,0-2.343-1.172-2.343h-1.172c-7.028,5.857-15.226,10.541-23.423,16.398   c-48.019,28.107-96.038,44.503-133.515,45.675c5.855,3.515,11.712,7.028,17.568,10.541c31.621-7.028,66.756-21.083,103.063-42.163   C305.492,328.612,318.376,320.414,330.087,311.045L330.087,311.045z" />
                  <Path d="M236.393,162.305c0,1.172,2.342,3.515,4.685,3.515c0,0,0,0,1.171,0c31.622-14.056,62.072-22.254,87.838-22.254   c-5.855-4.684-11.711-8.197-17.566-11.712c-23.423,4.685-48.02,14.056-73.785,26.937   C237.564,158.792,236.393,159.962,236.393,162.305L236.393,162.305z" />
                  <Path
                    d="M393.33,275.909c11.713,21.08,14.057,40.99,5.856,56.217c-8.199,15.225-26.938,23.424-51.53,25.768   c33.964,2.342,59.73-5.856,70.271-24.595c10.539-16.397,4.684-39.82-12.884-65.585c-1.171-1.172-2.341-2.344-4.685-2.344   c-4.686,0-7.028,3.516-7.028,7.027C393.33,273.568,393.33,274.737,393.33,275.909L393.33,275.909z"
                    fill="#FFFFFF"
                  />
                  <Path
                    d="M92.337,166.989c-1.171,1.172-3.513,3.513-3.513,5.856c1.171,3.513,4.685,7.026,9.37,5.854   c2.343,0,4.685-2.344,7.025-3.514c9.371-11.711,25.767-18.738,46.849-19.908C127.473,152.936,106.392,156.45,92.337,166.989   L92.337,166.989z"
                    fill="#FFFFFF"
                  />
                  {/* Add more <Path> elements as needed based on the original SVG */}
                </G>
              </Svg>
            </View>
            <Text style={styles.headerText}>TIP Sr</Text>
          </View>

          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textBoxes}
                placeholder="Introduce total cost"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                value={amount}
                onChangeText={(value) => validateAndSet(value, setAmount)}
              ></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textBoxes}
                placeholder="Tip porcentage %"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                value={percent}
                onChangeText={(value) => validateAndSet(value, setPercent)}
              ></TextInput>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={onCalcular}>
              <Text style={styles.saveButtonText}>Calculate</Text>
            </TouchableOpacity>

            <View>
              <View>
                <Text>Paying Total: $ {total}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
