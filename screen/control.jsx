import { Text, View } from "react-native";
import JoystickComponent from "../components/joystickComponent";
import { LinearGradient } from "expo-linear-gradient";
import { useSmokeContext } from "../utils/appContext";

const Control = () => {
  const { uid } = useSmokeContext();
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#1F91E4", "#F74B00"]}>
      {uid !== null && <JoystickComponent />}
      <LinearGradient
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        colors={["#1F91E4", "#F74B00"]}
      >
        <Text
          style={{
            fontSize: 40,
            color: "white",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Please scan your device 🕵️
        </Text>
      </LinearGradient>
    </LinearGradient>
  );
};

export default Control;
