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
import { useSmokeContext } from "../utils/smokeContext";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const Home = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { smoke, uid, updateUid, auth } = useSmokeContext();

  const splash = useRef();

  useEffect(() => {
    if (splash.current !== null) {
      splash.current.play();
    }
    setTimeout(() => {
      setLoading(false);
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
      console.log(data);
    });
  }

  function getGreeting() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 18) {
      return "Good morning! 🌞";
    } else {
      return "Good Evening. 🌛";
    }
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#FAF5FC",
      }}
    >
      <StatusBar
        backgroundColor={smoke ? "#B40001" : "#f16b00"}
        style="light"
      />
      <ConnectionModal
        uid={uid}
        updateUid={updateUid}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      ></ConnectionModal>
      {loading && (
        <LottieView
          ref={splash}
          style={{
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/animation_lo08fpgc.json")}
        />
      )}
      <View style={{ flex: 1, backgroundColor: smoke ? "#B40001" : "#f16b00" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 15,
              }}
            >
              {getGreeting()}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesome
                style={{ marginHorizontal: 15 }}
                name="user-circle"
                size={30}
                color="white"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "left",
                  marginHorizontal: 15,
                }}
              >
                Device UID: #{uid}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            margin: 10,
          }}
        >
          <MapView style={{ width: "100%", height: "100%" }} />
        </View>
      </View>
    </View>
  );
};

export default Home;
