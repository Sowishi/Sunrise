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

const Home = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { smoke, updateData, uid, updateUid, auth } = useSmokeContext();

  const splash = useRef();

  useEffect(() => {
    if (splash.current !== null) {
      splash.current.play();
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);

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

    fetchUid();

    fetchSmoke();
  }, [uid]);

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem("user", JSON.stringify(auth));
      console.log("sdfjdslfjdslkfjkldsj");
    }
    saveData();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Disable the back button
        return true;
      }
    );

    // Cleanup the event listener when the component is unmounted
    return () => {
      backHandler.remove();
    };
  }, []);

  function fetchSmoke() {
    const smokeRef = ref(database, `/uids/${uid}/smoke`);

    console.log(auth, "auth");

    onValue(smokeRef, (snapshot) => {
      const data = snapshot.val();

      if (data === 1) {
        showToast("error", "Smoke Detected!");
        updateData(true);
      } else {
        updateData(false);
      }
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

  function getGreetingAnimation() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 18) {
      return require("../assets/Goodevening.json");
    } else {
      return require("../assets/Goodmorning.json");
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

          <LottieView
            autoPlay
            style={{
              width: 100,
              height: 100,
            }}
            source={getGreetingAnimation()}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#FAF5FC",
            marginTop: 40,
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {smoke && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  color: "black",
                  marginTop: 30,
                  fontWeight: "bold",
                }}
              >
                Smoke Detected
              </Text>
              <Ionicons name="warning" size={40} color="#B40001" />
            </View>
          )}

          {!smoke && (
            <View>
              <TitleComponent
                title={
                  uid !== undefined
                    ? "Detecting Smoke..."
                    : "No Connected Device"
                }
                titleColor={"black"}
              />

              <Ionicons
                style={{ opacity: 0 }}
                name="warning"
                size={70}
                color="#B40001"
              />
            </View>
          )}

          {smoke && (
            <LottieView
              autoPlay
              style={{
                width: 400,
                height: 400,
              }}
              source={require("../assets/smoke.json")}
            />
          )}
          {!smoke && (
            <LottieView
              autoPlay
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/orange-2.json")}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
