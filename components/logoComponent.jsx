import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const LogoComponent = () => {
  return (
    <LinearGradient
      end={{ x: 0.2, y: 0.5 }}
      colors={["#FEE243", "#FE709E"]}
      style={{
        flex: 0.8,
        borderBottomLeftRadius: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/vinzons-removebg-preview.png")}
      />
    </LinearGradient>
  );
};

export default LogoComponent;
