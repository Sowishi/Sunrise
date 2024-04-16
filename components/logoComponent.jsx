import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const LogoComponent = () => {
  return (
    <LinearGradient
      end={{ x: 1, y: 1 }}
      colors={["#1F91E4", "#F74B00"]}
      style={{
        flex: 0.8,
        borderBottomLeftRadius: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/a-logo.png")}
      />
    </LinearGradient>
  );
};

export default LogoComponent;
