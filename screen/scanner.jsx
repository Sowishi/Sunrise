import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import LottieView from "lottie-react-native";
import Constants from "expo-constants";
import TitleComponent from "../components/titleComponent";

export default function Scanner({ handleUpdateUid }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const uid = parseInt(data);
    handleUpdateUid(uid);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BarCodeScanner
        style={{ flex: 1, width: 360, height: 500 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <LottieView
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          left: "30%",
          top: "33%",
        }}
        autoPlay
        source={require("../assets/scanner.json")}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
