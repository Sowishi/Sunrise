import { Text } from "react-native";

const TitleComponent = ({ title, titleColor, noBG }) => {
  return (
    <Text
      style={{
        color: titleColor ? titleColor : "white",
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold",
        backgroundColor: noBG ? "transparent" : "#FAF5FC",
      }}
    >
      {title}
    </Text>
  );
};

export default TitleComponent;
