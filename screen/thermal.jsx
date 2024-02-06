import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { onValue, ref, update } from "firebase/database";
import { database } from "../firebase";
import { useSmokeContext } from "../utils/smokeContext";

const Thermal = () => {
  const { smoke, uid } = useSmokeContext();

  const [thermalImage, setThermalImage] = useState("");

  const thermalImageRef = ref(database, `uids/${uid}/thermal_img`);

  useEffect(() => {
    onValue(thermalImageRef, (snapshot) => {
      const data = snapshot.val();
      setThermalImage(data);
    });
  }, [uid]);

  const requestImage = () => {
    update(ref(database, "/"), { requesting_img: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF5FC" }}>
      <View>
        {thermalImage.length >= 1 ? (
          <Image
            style={{ width: "100%", height: "92%" }}
            source={{
              uri: thermalImage,
            }}
          />
        ) : (
          <Text>Getting Image</Text>
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          event={requestImage}
          isDisable={smoke}
          text="Request"
          bgColor={"#0B60B0"}
        />
      </View>
    </View>
  );
};

export default Thermal;
