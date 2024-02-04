import { Text } from "react-native";

const TitleComponent = ({ title, titleColor }) => {
  return (
    <Text
      style={{
        color: titleColor ? titleColor : "white",
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold",
      }}
    >
      {title}
    </Text>
  );
};

export default TitleComponent;
