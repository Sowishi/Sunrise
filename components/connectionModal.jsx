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
import { useEffect, useRef, useState } from "react";
import { database } from "../firebase";
import { get, onValue, ref, update } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import LineComponent from "./line";
import { showToast } from "./toast";
import { useSmokeContext } from "../utils/smokeContext";
import * as Updates from "expo-updates";

const ConnectionModal = ({ modalVisible, closeModal, children }) => {
  const [owner, setOwner] = useState("");
  const [emergency, setEmergency] = useState("");
  const [bfp, setBfp] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newBfp, setNewBfp] = useState("");
  const [newUid, setNewUid] = useState();
  const [newEmergency, setNewEmergency] = useState("");

  const { uid, updateUid, auth } = useSmokeContext();

  const ownerRef = ref(database, `uids/${uid}/owner`);
  const emergencyRef = ref(database, `uids/${uid}/emergency`);
  const bfpRef = ref(database, `uids/${uid}/bfp`);

  const deviceRef = useRef();
  const emergencyInputRef = useRef();
  const bfpInputRef = useRef();
  const ownerInputRef = useRef();

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
  }, [uid]);

  const blur = () => {
    emergencyInputRef.current.blur();
    bfpInputRef.current.blur();
    ownerInputRef.current.blur();
  };

  const handleUpdateInfo = () => {
    if (isNaN(newBfp)) {
      showToast(
        "error",
        "Please input an integer in Bureau of Fire Protection."
      );
      blur();
      return;
    } else if (isNaN(newEmergency)) {
      showToast("error", "Please input an integer in Emergency Contact Number");
      blur();
      return;
    } else {
      update(ref(database, `/uids/${uid}`), {
        owner: newOwner.length <= 0 ? owner : newOwner.toString(),
      });
      update(ref(database, `/uids/${uid}`), {
        bfp: newBfp.length <= 0 ? bfp : parseInt(newBfp),
      });
      update(ref(database, `/uids/${uid}`), {
        emergency:
          newEmergency.length <= 0 ? emergency : parseInt(newEmergency),
      });
      showToast("success", "Updated Successfully.");
      blur();
    }
  };

  const handleUpdateUid = () => {
    if (!isNaN(newUid)) {
      checkIfUidExist(newUid);
    } else {
      deviceRef.current.blur();

      showToast("error", "Device uid is not a number.");
    }
  };

  const checkIfUidExist = async (uid) => {
    let found = false;
    const snapshot = await get(ref(database, "/uids"));
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        if (parseInt(key) == parseInt(uid)) {
          let number = parseInt(newUid);
          update(ref(database, `users/${auth.id}`), {
            uid: number,
          });
          deviceRef.current.blur();
          showToast("success", "Connected Successfully, please wait...");
          Updates.reloadAsync();

          found = true;
        } else {
          if (!found) {
            showToast("error", "Device UID is not exist.");
            deviceRef.current.blur();
          }
        }
      });
    }
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <View style={{ paddingHorizontal: 10, marginTop: 30, flex: 1 }}>
                <Text style={{ color: "gray", marginBottom: 3 }}>
                  Device UID
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
                  <FontAwesome5 name="robot" size={17} color="gray" />
                  <TextInput
                    inputMode="numeric"
                    placeholder="Enter UID"
                    ref={deviceRef}
                    onChangeText={(text) => setNewUid(text)}
                    style={{
                      flex: 1,
                      paddingVertical: 9,
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
              </View>
              <SmallButton
                event={handleUpdateUid}
                text="Connect"
                bgColor={"#F77000"}
              />
            </View>

            {uid !== undefined && (
              <>
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
                    <MaterialCommunityIcons
                      name="account"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      ref={ownerInputRef}
                      onChangeText={(text) => setNewOwner(text)}
                      placeholder={
                        owner == undefined ? "Unknown" : owner.toString()
                      }
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
                    <MaterialIcons name="sos" size={24} color="gray" />
                    <TextInput
                      inputMode="numeric"
                      ref={emergencyInputRef}
                      onChangeText={(text) => setNewEmergency(text)}
                      placeholder={
                        emergency == undefined
                          ? "Unknown"
                          : emergency.toString()
                      }
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
                    <MaterialCommunityIcons
                      name="fire"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      inputMode="numeric"
                      ref={bfpInputRef}
                      onChangeText={(text) => setNewBfp(text)}
                      placeholder={
                        bfp == undefined ? "Unknown" : bfp.toString()
                      }
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
                    text="Close"
                    bgColor={"#232D3F"}
                  />
                  <SmallButton
                    event={handleUpdateInfo}
                    text="Update"
                    bgColor={"#0B60B0"}
                  />
                </View>
              </>
            )}
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
  },
  modalView: {
    backgroundColor: "#FAF5FC",
    width: "100%",
    height: 560,
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

export default ConnectionModal;
