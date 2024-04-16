import { ref, update } from "firebase/database";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { database } from "../firebase";
import { useSmokeContext } from "../utils/appContext";
import Button from "./button";

const JoystickComponent = () => {
  const [upPress, setUpPress] = useState(false);
  const [downPress, setDownPress] = useState(false);
  const [leftPress, setLeftPress] = useState(false);
  const [rightPress, setRightPress] = useState(false);
  const { uid } = useSmokeContext();

  const controlRef = ref(database, `uids/${uid}/`);

  const handlePress = (action) => {
    if (action == "up") {
      setUpPress(true);
      update(controlRef, { up: 1 });
    }
    if (action == "down") {
      setDownPress(true);
      update(controlRef, { down: 1 });
    }
    if (action == "left") {
      setLeftPress(true);
      update(controlRef, { left: 1 });
    }
    if (action == "right") {
      setRightPress(true);
      update(controlRef, { right: 1 });
    }
  };

  const handlePressOut = (action) => {
    if (action == "up") {
      setUpPress(false);
      update(controlRef, { up: 0 });
    }
    if (action == "down") {
      setDownPress(false);
      update(controlRef, { down: 0 });
    }
    if (action == "left") {
      setLeftPress(false);
      update(controlRef, { left: 0 });
    }
    if (action == "right") {
      setRightPress(false);
      update(controlRef, { right: 0 });
    }
  };

  const handleGetSample = () => {
    update(controlRef, { getSample: 1 });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {upPress && (
        <Text
          style={{
            color: "white",
            fontSize: 30,
            position: "absolute",
            top: 60,
          }}
        >
          Going forward...
        </Text>
      )}

      {downPress && (
        <Text
          style={{
            color: "white",
            fontSize: 30,
            position: "absolute",
            top: 60,
          }}
        >
          Going backward...
        </Text>
      )}
      {leftPress && (
        <Text
          style={{
            color: "white",
            fontSize: 30,
            position: "absolute",
            top: 60,
          }}
        >
          Going left...
        </Text>
      )}
      {rightPress && (
        <Text
          style={{
            color: "white",
            fontSize: 30,
            position: "absolute",
            top: 60,
          }}
        >
          Going right...
        </Text>
      )}
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
      <View style={{ marginTop: 40 }}>
        <Button text="Get Sample" bgColor={"#344854"} event={handleGetSample} />
      </View>
    </View>
  );
};

export default JoystickComponent;
