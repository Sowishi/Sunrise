import { Text } from "react-native";

const TitleComponent = ({ title }) => {
  return (
    <Text
      style={{
        color: "white",
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
