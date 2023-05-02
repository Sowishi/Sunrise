import { TextInput } from "react-native";

const Input = ({ label, event }) => {
  return (
    <TextInput
      onChangeText={event}
      style={{
        backgroundColor: "#FEB64899",
        paddingVertical: 5,
        paddingLeft: 10,
        borderRadius: 5,
      }}
      placeholder={label}
    />
  );
};

export default Input;
