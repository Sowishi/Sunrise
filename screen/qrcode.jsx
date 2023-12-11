import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

const Qrcode = ({ route }) => {
  const { currentUser, borrowedID } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginHorizontal: 20,
          marginVertical: 30,
        }}
      >
        Please patiently wait while the librarian scan your QR code
      </Text>
      <QRCode
        style={{ width: "100%", height: "100%" }}
        size={300}
        value={!currentUser ? borrowedID : currentUser.schoolID}
        logo={require("../assets/laco-removebg-preview.png")}
      />
    </View>
  );
};

export default Qrcode;
