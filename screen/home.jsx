import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { database } from "../firebase";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "../components/toast";
import { get, onValue, ref } from "firebase/database";
import TitleComponent from "../components/titleComponent";
import { FontAwesome } from "@expo/vector-icons";
import ConnectionModal from "../components/connectionModal";
import { useSmokeContext } from "../utils/appContext";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Callout } from "react-native-maps";
import { Marker, Circle } from "react-native-maps";
import SmallButton from "../components/smallButton";

const Home = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapType, setMapType] = useState("standard");
  const [deviceValue, setDeviceValue] = useState(undefined);

  const { uid, updateUid, auth, MASTER_NAME, SLAVE_NAME } = useSmokeContext();

  const splash = useRef();

  useEffect(() => {
    if (splash.current !== null) {
      splash.current.play();
    }
    setTimeout(() => {
      setLoading(false);
      setMapReady(true);
    }, 2000);

    fetchUidValue();
    fetchUid();
  }, [uid]);

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem("user", JSON.stringify(auth));
    }
    saveData();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  async function fetchUid() {
    const userRef = ref(database, `users/${auth.id}`);
    const snapshot = await get(userRef);
    const data = snapshot.val();
    if (data.uid == undefined) {
      updateUid(undefined);
    } else {
      updateUid(data.uid);
    }
  }

  function fetchUidValue() {
    const dataRef = ref(database, `/uids/${uid}`);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setDeviceValue(data);
    });
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#FAF5FC",
      }}
    >
      <StatusBar style="light" />
      <ConnectionModal
        uid={uid}
        updateUid={updateUid}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      ></ConnectionModal>
      {loading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            style={{
              width: "70%",
              height: "70%",
            }}
            ref={splash}
            source={require("../assets/maps.json")}
          />
        </View>
      )}

      <View style={{ flex: 1 }}>
        {deviceValue !== undefined && (
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 20,
                right: 10,
                zIndex: 2,
                backgroundColor: "#fefefe99",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="user-circle" size={30} color="#F77000" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 20,
                zIndex: 2,
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
                  event={() => setMapType("hybrid")}
                  text="Satellite"
                  bgColor={"#F77000"}
                />
                <SmallButton
                  event={() => setMapType("standard")}
                  text="Standard"
                  bgColor={"#232D3F"}
                />
              </View>
            </View>

            <MapView
              mapType={mapType}
              showsMyLocationButton={true}
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: 14.0996,
                longitude: 122.955,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: deviceValue.master.lat,
                  longitude: deviceValue.master.long,
                }}
                title={MASTER_NAME}
              />

              <Marker
                coordinate={{
                  latitude: deviceValue.slave.lat,
                  longitude: deviceValue.slave.long,
                }}
                title={SLAVE_NAME}
                pinColor="#0D1117"
              />
              <Circle
                center={{
                  latitude: deviceValue.master.lat,
                  longitude: deviceValue.master.long,
                }}
                radius={5000}
                fillColor="#CC000040"
                strokeColor="#CC000040"
              />
            </MapView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
