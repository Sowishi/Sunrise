import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Button = ({ text, icon, bgColor, event }) => {
  return (
    <TouchableOpacity
      onPress={event}
      style={{
        backgroundColor: bgColor,
        width: 150,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 10,
      }}
    >
      <Text style={{ fontSize: 20, color: "white", marginRight: 5 }}>
        {text}
      </Text>
      <MaterialCommunityIcons name={icon} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default Button;
