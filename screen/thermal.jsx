import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { useSmokeContext } from "../utils/smokeContext";

const Thermal = () => {
  const { smoke } = useSmokeContext();
  console.log(smoke, "in thermal");

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF5FC" }}>
      <View>
        <Image
          style={{ width: "100%", height: "92%" }}
          source={{
            uri: "https://fastly.picsum.photos/id/588/200/300.jpg?hmac=Bb5mvfvSw-sKhocAA4Mfdb78ysl5ktbClTt-Lc0IyWk",
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button isDisable={smoke} text="Request" bgColor={"#0B60B0"} />
      </View>
    </View>
  );
};

export default Thermal;
