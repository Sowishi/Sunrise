import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const JoystickComponent = () => {
  const [upPress, setUpPress] = useState(false);
  const [downPress, setDownPress] = useState(false);
  const [leftPress, setLeftPress] = useState(false);
  const [rightPress, setRightPress] = useState(false);

  const handlePress = (action) => {
    if (action == "up") {
      setUpPress(true);
      console.log("up");
    }
    if (action == "down") {
      setDownPress(true);
      console.log("down");
    }
    if (action == "left") {
      setLeftPress(true);
      console.log("left");
    }
    if (action == "right") {
      setRightPress(true);
      console.log("right");
    }
  };

  const handlePressOut = (action) => {
    if (action == "up") {
      setUpPress(false);
      console.log("up close");
    }
    if (action == "down") {
      setDownPress(false);
      console.log("down close");
    }
    if (action == "left") {
      setLeftPress(false);
      console.log("left close");
    }
    if (action == "right") {
      setRightPress(false);
      console.log("right close");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "#515760",
            borderRadius: 300,
          }}
        >
          <TouchableOpacity
            onPressIn={() => handlePress("up")}
            onPressOut={() => {
              handlePressOut("up");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 100,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 100,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#40CCD0", // Change color as needed
              transform: [{ rotate: "180deg" }], // Rotate the triangle to make it upside-down
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("down")}
            onPressOut={() => {
              handlePressOut("down");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              left: 100,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 100,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#40CCD0", // Change color as needed
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("left")}
            onPressOut={() => {
              handlePressOut("left");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 100,
              left: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 100,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#40CCD0", // Change color as needed
              transform: [{ rotate: "90deg" }], // Rotate the triangle to make it upside-down
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("right")}
            onPressOut={() => {
              handlePressOut("right");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 100,
              right: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 100,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#40CCD0", // Change color as needed
              transform: [{ rotate: "270deg" }], // R
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("right")}
            onPressOut={() => {
              handlePressOut("right");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 20,
              left: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 80,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "white", // Change color as needed
              transform: [{ rotate: "250deg" }], // R
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("right")}
            onPressOut={() => {
              handlePressOut("right");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 20,
              right: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 80,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "white", // Change color as needed
              transform: [{ rotate: "-250deg" }], // R
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("right")}
            onPressOut={() => {
              handlePressOut("right");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              left: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 80,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "white", // Change color as needed
              transform: [{ rotate: "285deg" }], // R
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handlePress("right")}
            onPressOut={() => {
              handlePressOut("right");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              right: 0,
              zIndex: 10,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 50,
              borderRightWidth: 50,
              borderBottomWidth: 80,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "white", // Change color as needed
              transform: [{ rotate: "-285deg" }], // R
            }}
          ></TouchableOpacity>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              backgroundColor: "#181B1A",
              position: "absolute",
              left: 75,
              bottom: 80,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default JoystickComponent;
