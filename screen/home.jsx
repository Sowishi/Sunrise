import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
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
import moment from "moment";

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
        setWeather(data);
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
      <StatusBar backgroundColor={"#F7A200"} style="light" />

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

            {deviceValue !== null && (
              <LinearGradient
                style={{ flex: 1 }}
                colors={["#F7C77C", "#ECB136"]}
              >
                {weather !== null && (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1.2,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: 70, height: 70 }}
                          source={{
                            uri: "https:" + weather.current.condition.icon,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 25,
                            color: "white",
                          }}
                        >
                          {weather.current.condition.text}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {weather.location.name}, {weather.location.region}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 80,
                          color: "white",
                        }}
                      >
                        {weather.current.temp_c}°
                      </Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                      <View
                        style={{
                          backgroundColor: "#F6F7E5",
                          flex: 1,
                          width: "100%",
                          padding: 20,
                        }}
                      >
                        <Text style={{ textAlign: "center", marginBottom: 10 }}>
                          Last Updated:{" "}
                          {moment(weather.current.last_updated).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>Humidity</Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.humidity}%
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Humidity Level in percentage
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>Cloud</Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.cloud}%
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Cloud cover as a percentage
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",

                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>
                            Atmospheric Pressure
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.pressure_in}
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Atmospheric pressure in inches
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>
                            Temperature Feels Like
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.feelslike_c}%
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Temperature Feels Like in Celcius
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>Visibility</Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.vis_km}km
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Visibility in kilometers
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>UV Index </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.uv}
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              strength of ultraviolet radiation from the sun
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 13 }}>Wind speed</Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {weather.current.wind_mph}
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              Wind speed in miles per hour
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                )}
              </LinearGradient>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
