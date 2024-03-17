import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner({ handleUpdateUid }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const res = JSON.parse(data);
    const resUID = res["UID"];
    handleUpdateUid(resUID);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

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
        onBarCodeScanned={handleBarCodeScanned}
        style={{ width: Dimensions.get("window").width, height: 500 }}
      ></BarCodeScanner>

      <LottieView
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          left: "28%",
          top: "28%",
        }}
        autoPlay
        source={require("../assets/scanner.json")}
      />
    </View>
  );
}
