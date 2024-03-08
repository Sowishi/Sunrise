import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Camera } from "expo-camera";

export default function Scanner({ handleUpdateUid }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const uid = parseInt(data);
    handleUpdateUid(uid);
  };

  if (permission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (permission === false) {
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
      {permission && (
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          style={{ width: Dimensions.get("window").width, height: 500 }}
        ></Camera>
      )}
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
