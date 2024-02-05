import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TitleComponent from "./titleComponent";
import { Ionicons } from "@expo/vector-icons";
import SmallButton from "./smallButton";

const BottomModal = ({ modalVisible, closeModal, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TitleComponent
            title={"Personal Details"}
            titleColor={"black"}
            noBG={true}
          />
          <View style={{ flex: 1, width: "100%" }}>
            <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
              <Text style={{ color: "gray", marginBottom: 3 }}>Owner</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 3,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="mail" size={24} color="#999999" />
                <TextInput
                  placeholder="Emergency Number"
                  style={{
                    flex: 1,
                    paddingVertical: 9,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
              <Text style={{ color: "gray", marginBottom: 3 }}>
                Emergency Contact Number
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 3,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="mail" size={24} color="#999999" />
                <TextInput
                  placeholder="Emergency Number"
                  style={{
                    flex: 1,
                    paddingVertical: 9,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
              <Text style={{ color: "gray", marginBottom: 3 }}>
                Emergency Contact Number
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 3,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="mail" size={24} color="#999999" />
                <TextInput
                  placeholder="Emergency Number"
                  style={{
                    flex: 1,
                    paddingVertical: 9,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 20,
                justifyContent: "space-between",
              }}
            >
              <SmallButton
                event={closeModal}
                text="Cancel"
                bgColor={"#232D3F"}
              />
              <SmallButton text="Update" bgColor={"#0B60B0"} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#24252699",
  },
  modalView: {
    backgroundColor: "#FAF5FC",
    width: "100%",
    height: 500,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default BottomModal;
