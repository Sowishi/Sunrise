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
import { useSmokeContext } from "../utils/appContext";
import * as Updates from "expo-updates";
import BottomModal from "./bottomModal";
import Scanner from "../screen/scanner";

const ConnectionModal = ({
  modalVisible,
  closeModal,
  setMapType,
  navigation,
}) => {
  const [masterName, setMasterName] = useState("");
  const [slaveName, setSlaveName] = useState("");
  const [newMasterName, setNewMasterName] = useState("");
  const [newSlaveName, setNewSlaveName] = useState("");
  const [newUid, setNewUid] = useState();
  const [radius, setRadius] = useState("");
  const [newRadius, setNewRadius] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const { uid, auth, updateMasterName, updateSlaveName, updateRadius } =
    useSmokeContext();

  const masterRef = ref(database, `uids/${uid}/masterName`);
  const slaveRef = ref(database, `uids/${uid}/slaveName`);
  const radiusRef = ref(database, `uids/${uid}/radius`);

  const masterInputRef = useRef();
  const slaveInputRef = useRef();
  const deviceRef = useRef();
  const radiusInputRef = useRef();

  useEffect(() => {
    onValue(masterRef, (snapshot) => {
      const data = snapshot.val();
      setMasterName(data);
      updateMasterName(data);
    });
    onValue(slaveRef, (snapshot) => {
      const data = snapshot.val();
      setSlaveName(data);
      updateSlaveName(data);
    });
    onValue(radiusRef, (snapshot) => {
      const data = snapshot.val();
      setRadius(data);
      updateRadius(data);
    });
  }, [uid]);

  const blur = () => {
    masterInputRef.current.blur();
    slaveInputRef.current.blur();
    radiusInputRef.current.blur();
  };

  const handleUpdateInfo = () => {
    update(ref(database, `/uids/${uid}`), {
      radius: newRadius.length <= 0 ? radius : parseInt(newRadius),
    });

    update(ref(database, `/uids/${uid}`), {
      masterName:
        newMasterName.length <= 0 ? masterName : newMasterName.toString(),
    });

    update(ref(database, `/uids/${uid}`), {
      slaveName: newSlaveName.length <= 0 ? slaveName : newSlaveName.toString(),
    });

    showToast("success", "Updated Successfully.");
    blur();
  };

  const handleUpdateUid = (uid) => {
    if (!isNaN(uid)) {
      checkIfUidExist(uid);
    } else {
      deviceRef.current.blur();
      setShowScanner(false);
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
          let number = parseInt(uid);
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
            setShowScanner(false);
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
            title={`Device Details #${uid}`}
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
                    placeholder={`UID: ${uid} `}
                    ref={deviceRef}
                    editable={false}
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
                event={() => {
                  setShowScanner(true);
                }}
                text="Scan UID"
                bgColor={"#F77000"}
              />
            </View>

            <BottomModal
              closeModal={() => setShowScanner(false)}
              heightPx={500}
              modalVisible={showScanner}
            >
              <Scanner handleUpdateUid={handleUpdateUid} />
            </BottomModal>

            {uid !== undefined && (
              <>
                <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
                  <Text style={{ color: "gray", marginBottom: 3 }}>
                    Map Type
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#fefefe99",
                        width: "90%",
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        borderRadius: 5,
                      }}
                    >
                      <SmallButton
                        event={() => {
                          setMapType("hybrid");
                          closeModal();
                        }}
                        text="Satellite"
                        bgColor={"#F77000"}
                      />
                      <SmallButton
                        event={() => {
                          setMapType("standard");
                          closeModal();
                        }}
                        text="Standard"
                        bgColor={"#232D3F"}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
                  <Text style={{ color: "gray", marginBottom: 3 }}>
                    Master Name
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
                      name="account"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      ref={masterInputRef}
                      onChangeText={(text) => setNewMasterName(text)}
                      placeholder={
                        masterName == undefined
                          ? "Unknown"
                          : masterName.toString()
                      }
                      style={{
                        flex: 1,
                        paddingVertical: 9,
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
                  <Text style={{ color: "gray", marginBottom: 3 }}>
                    Slave Name
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
                      name="account"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      ref={slaveInputRef}
                      onChangeText={(text) => setNewSlaveName(text)}
                      placeholder={
                        slaveName == undefined
                          ? "Unknown"
                          : slaveName.toString()
                      }
                      style={{
                        flex: 1,
                        paddingVertical: 9,
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
                  <Text style={{ color: "gray", marginBottom: 3 }}>
                    Radius (meter)
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
                      name="circle"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      ref={radiusInputRef}
                      onChangeText={(text) => setNewRadius(text)}
                      placeholder={
                        radius == undefined ? "Unknown" : radius.toString()
                      }
                      keyboardType="numeric"
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
    height: 620,
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
