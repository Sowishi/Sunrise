import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";

const Thermal = () => {
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
        <Button text="Request" bgColor={"#232D3F"} icon={"account-arrow-up"} />
      </View>
    </View>
  );
};

export default Thermal;
