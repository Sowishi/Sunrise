import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { database } from "../firebase";
import LottieView from "lottie-react-native";
import { get, onValue, ref } from "firebase/database";
import { FontAwesome } from "@expo/vector-icons";
import ConnectionModal from "../components/connectionModal";
import { useSmokeContext } from "../utils/appContext";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallButton from "../components/smallButton";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceValue, setDeviceValue] = useState(null);
  const [weather, setWeather] = useState(null);

  const { uid, updateUid, auth } = useSmokeContext();

  const splash = useRef();

  // Displaying the animated loader then fetching uid and and deviceValue

  useEffect(() => {
    if (splash.current !== null) {
      splash.current.play();
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    fetchUidValue();
    fetchUid();
    fetchWeather();
  }, [uid]);

  //Disable the back button functionality

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

  //Fetching the device value

  async function fetchUid() {
    const userRef = ref(database, `users/${auth.id}`);
    const snapshot = await get(userRef);
    const data = snapshot.val();
    if (data.uid == undefined) {
      updateUid(null);
    } else {
      updateUid(data.uid, "device value");
    }
  }

  function fetchUidValue() {
    const dataRef = ref(database, `/uids/${uid}`);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setDeviceValue(data);
    });
  }

  function fetchWeather() {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=563196700d224d06afb153723242903&q=14.0996,122.9550"
    ).then((res) => {
      res.json().then((data) => {
        fetchWeather(data);
      });
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
      <StatusBar backgroundColor={"#4C3488"} style="light" />

      <ConnectionModal
        navigation={navigation}
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
            source={require("../assets/sun.json")}
          />
        </View>
      )}

      <View style={{ flex: 1 }}>
        {uid !== undefined && (
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              position: "relative",
            }}
          >
            {/* User Control Navigation */}
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
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="user-circle" size={30} color="#F77000" />
              </TouchableOpacity>
            </View>

            {uid == null && (
              <LinearGradient
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                colors={["#F7A200", "#F74B00"]}
              >
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  Please scan your device 🕵️
                </Text>
                <SmallButton
                  event={() => {
                    setModalVisible(true);
                  }}
                  text="Scan"
                  bgColor={"#232D3F"}
                />
              </LinearGradient>
            )}

            {/* The maps */}

            {deviceValue !== null && <Text>h12</Text>}
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
