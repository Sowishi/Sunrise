import { View } from "react-native";
import JoystickComponent from "../components/joystickComponent";
import { LinearGradient } from "expo-linear-gradient";

const Control = () => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F7A200", "#F74B00"]}>
      <JoystickComponent />
    </LinearGradient>
  );
};

export default Control;
