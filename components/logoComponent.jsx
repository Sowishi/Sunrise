import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const LogoComponent = () => {
  return (
    <LinearGradient
      end={{ x: 0.1, y: 0.5 }}
      colors={["#FC6736", "#0C2D57"]}
      style={{
        flex: 0.8,
        borderBottomLeftRadius: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/logo.png")}
      />
    </LinearGradient>
  );
};

export default LogoComponent;
