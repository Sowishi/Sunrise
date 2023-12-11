import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "../components/button";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "../components/toast";

const Home = ({ route, navigation }) => {
  // const { currentUser } = route.params;
  // const [borrowedBooks, setBorrowedBooks] = useState([]);
  // const [libraryState, setLibraryState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [smoke, setSmoke] = useState(false);

  const splash = useRef();

  useEffect(() => {
    if (splash.current !== null) {
      splash.current.play();
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const smokeDoc = doc(db, "smoke", "smokeState");
    onSnapshot(smokeDoc, (snapshot) => {
      const smoke = snapshot.data();
      if (smoke["smoke"] == 1) {
        setSmoke(true);
        showToast("error", "Smoke Detected!");
      } else {
        setSmoke(false);
      }
    });
  }, []);

  function getGreeting() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning! 🌞";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon ⛅";
    } else {
      return "Good night! 🌛";
    }
  }

  // useEffect(() => {
  //   const libStateRef = collection(db, "libState");
  //   onSnapshot(libStateRef, (snapshot) => {
  //     let libState = undefined;
  //     snapshot.forEach((doc) => {
  //       libState = doc.data().state;
  //     });
  //     setLibraryState(libState);
  //   });
  // }, []);

  // const handleLibraryState = () => {
  //   const docRef = doc(db, "libState", "OlTcG1ZZO1rPqR5ltgp7");
  //   updateDoc(docRef, { state: libraryState ? false : true });
  // };

  // const renderBorrowedBooks = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() =>
  //         navigation.navigate("view-book", {
  //           book: item,
  //           currentUser: currentUser,
  //         })
  //       }
  //     >

  //       <LinearGradient
  //         style={{
  //           paddingVertical: 20,
  //           opacity: 0.5,
  //           margin: 10,
  //           marginHorizontal: 20,
  //           borderRadius: 10,
  //           paddingHorizontal: 10,
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //         colors={["#DDA033", "#0D97AC"]}
  //         start={{ x: 0.1, y: 0.2 }}
  //       >
  //         <Text style={{ fontSize: 20 }}>{item.bookName}</Text>
  //         <MaterialCommunityIcons
  //           style={{ marginRight: 10 }}
  //           name="arrow-right-thin"
  //           size={24}
  //           color="black"
  //         />
  //       </LinearGradient>
  //     </TouchableOpacity>
  //   );
  // };

  // const filteredBooks = borrowedBooks.filter((book) => {
  //   if (book.issuedTo.schoolID === currentUser.schoolID) {
  //     return book;
  //   }
  // });

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
      }}
    >
      <StatusBar
        backgroundColor={smoke ? "#B40001" : "#f16b00"}
        style="light"
      />
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
        <TouchableOpacity
          onPress={() => navigation.navigate("landing")}
          style={{ margin: 20 }}
        >
          <Ionicons name="arrow-back" size={45} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {getGreeting()}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
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
              <Ionicons name="warning" size={70} color="#B40001" />
            </View>
          )}

          {!smoke && (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  color: "black",
                  marginTop: 30,
                  fontWeight: "bold",
                }}
              >
                Detecting Smoke...
              </Text>
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
