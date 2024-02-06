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
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { onValue, ref, update } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomModal = ({ modalVisible, closeModal, children }) => {
  const [owner, setOwner] = useState("");
  const [emergency, setEmergency] = useState("");
  const [bfp, setBfp] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newBfp, setNewBfp] = useState("");

  const ownerRef = ref(database, "uids/23/owner");
  const emergencyRef = ref(database, "uids/23/emergency");
  const bfpRef = ref(database, "uids/23/bfp");

  useEffect(() => {
    onValue(bfpRef, (snapshot) => {
      const data = snapshot.val();
      setBfp(data);
    });

    onValue(ownerRef, (snapshot) => {
      const data = snapshot.val();
      setOwner(data);
    });
    onValue(emergencyRef, (snapshot) => {
      const data = snapshot.val();
      setEmergency(data);
    });
  }, []);

  const updateInfo = () => {
    update(ref(database, "/uids/23"), {
      owner: newOwner.length <= 0 ? owner : newOwner.toString(),
    });
    update(ref(database, "/uids/23"), {
      bfp: newBfp.length <= 0 ? bfp : parseInt(newBfp),
    });
  };

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
            title={"Device Details"}
            titleColor={"black"}
            noBG={true}
          />
          <View style={{ flex: 1, width: "100%" }}>
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
                <MaterialIcons name="sos" size={24} color="gray" />
                <TextInput
                  editable={false}
                  placeholder={emergency.toString()}
                  style={{
                    flex: 1,
                    paddingVertical: 9,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            </View>
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
                <MaterialCommunityIcons name="account" size={24} color="gray" />
                <TextInput
                  onChangeText={(text) => setNewOwner(text)}
                  placeholder={owner.toString()}
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
                Bureau of Fire Protection{" "}
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
                <MaterialCommunityIcons name="fire" size={24} color="gray" />
                <TextInput
                  onChangeText={(text) => setNewBfp(text)}
                  placeholder={bfp.toString()}
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
              <SmallButton
                event={updateInfo}
                text="Update"
                bgColor={"#0B60B0"}
              />
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
