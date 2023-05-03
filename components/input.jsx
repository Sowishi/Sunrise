import { TextInput } from "react-native";

const Input = ({ label, event, secured, enabled }) => {
  return (
    <TextInput
      secureTextEntry={secured}
      onChangeText={event}
      editable={enabled}
      style={{
        backgroundColor: "#FEB64899",
        paddingVertical: 8,
        paddingLeft: 10,
        borderRadius: 5,
      }}
      placeholder={label}
    />
  );
};

export default Input;
