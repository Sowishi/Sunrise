import { View, Text, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0D97AC99",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 99,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Loading, please wait...{" "}
        <ActivityIndicator size={"large"} color={"white"} />
      </Text>
    </View>
  );
};

export default Loader;
