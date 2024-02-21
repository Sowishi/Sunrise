import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { onValue, ref, update } from "firebase/database";
import { database } from "../firebase";
import { useSmokeContext } from "../utils/appContext";
import TitleComponent from "../components/titleComponent";
import LineComponent from "../components/line";
import Constants from "expo-constants";

const Thermal = ({ navigation }) => {
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
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#FAF5FC",
      }}
    >
      <View style={{ flex: 1, backgroundColor: smoke ? "#B40001" : "#f16b00" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                marginHorizontal: 15,
              }}
            >
              Thermal Image 🌡️
            </Text>
          </View>
        </View>

        {uid !== undefined ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "#FAF5FC",
              marginTop: 40,
              borderTopRightRadius: 100,
              borderTopLeftRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {thermalImage && (
              <Image
                style={{
                  width: 300,
                  height: 400,
                  borderRadius: 10,
                  borderTopRightRadius: 100,
                  borderTopLeftRadius: 100,
                }}
                source={{
                  uri: thermalImage,
                }}
              />
            )}
            <View style={{ marginTop: 20 }}>
              <Button
                text="Request"
                bgColor={"#0B60B0"}
                event={requestImage}
                isDisable={smoke}
              />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TitleComponent noBG={true} title={"No Connected Device"} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Thermal;
