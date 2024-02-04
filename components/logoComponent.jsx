import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const LogoComponent = () => {
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
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
