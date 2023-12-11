import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "../components/button";
import LottieView from 'lottie-react-native';


const Home = ({ route, navigation }) => {
  const { currentUser } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [libraryState, setLibraryState] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);



  const splash = useRef()


  useEffect(() => {
    const borrowedRef = collection(db, "borrowed");
    onSnapshot(borrowedRef, (snapshot) => {
      const books = [];
      snapshot.forEach((doc) => {
        books.push({ ...doc.data(), borrowedID: doc.id });
      });
      setBorrowedBooks(books);
    });
    splash.current.play()
    setTimeout(() => {
      setSplashVisible(false)
    }, 2000);
  }, []);

  useEffect(() => {
    const libStateRef = collection(db, "libState");
    onSnapshot(libStateRef, (snapshot) => {
      let libState = undefined;
      snapshot.forEach((doc) => {
        libState = doc.data().state;
      });
      setLibraryState(libState);
    });
  }, []);

  const handleLibraryState = () => {
    const docRef = doc(db, "libState", "OlTcG1ZZO1rPqR5ltgp7");
    updateDoc(docRef, { state: libraryState ? false : true });
  };

  const renderBorrowedBooks = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("view-book", {
            book: item,
            currentUser: currentUser,
          })
        }
      >
     
       
        <LinearGradient
          style={{
            paddingVertical: 20,
            opacity: 0.5,
            margin: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          colors={["#DDA033", "#0D97AC"]}
          start={{ x: 0.1, y: 0.2 }}
        >
          <Text style={{ fontSize: 20 }}>{item.bookName}</Text>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="arrow-right-thin"
            size={24}
            color="black"
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const filteredBooks = borrowedBooks.filter((book) => {
    if (book.issuedTo.schoolID === currentUser.schoolID) {
      return book;
    }
  });

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="white" />
         {splashVisible && <LottieView
         ref={splash}
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require('../assets/animation_lo08fpgc.json')}
      /> }   
      <View
        style={{
          padding: 20,
          paddingHorizontal: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 30 }}>
          Hello,{" "}
          <Text style={{ fontWeight: "bold" }}>
            {currentUser.firstName + " " + currentUser.lastName}
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (currentUser.role === "admin") {
              navigation.navigate("qrcode-scanner", {
                currentUser: currentUser,
              });
            } else {
              navigation.navigate("qrcode", { currentUser: currentUser });
            }
          }}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.7 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentUser.role === "admin" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                text={libraryState ? "Close Library" : "Open Library"}
                bgColor={"#FEB648"}
                event={handleLibraryState}
              />
              <Button
                text={"Scan Book"}
                bgColor={"#FEB648"}
                event={() =>
                  navigation.navigate("scan-book", { currentUser: currentUser })
                }
              />
            </View>
          )}
        </View>
        {libraryState ? (
          <Image
            resizeMode="contain"
            source={require("../assets/lib-open.png")}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require("../assets/lib-close.png")}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{ backgroundColor: "#FEB648", width: "80%", height: 5 }}
        ></View>
      </View>

      {currentUser.role === "admin" ? (
        <View style={{ flex: 1 }}>
          {borrowedBooks.length <= 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 30,
              }}
            >
              <Text
                style={{ fontSize: 25, textAlign: "center", color: "gray" }}
              >
                You don't have a borrowed book yet
              </Text>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 25, marginLeft: 20, fontWeight: "bold" }}
                >
                  Borrowed Books
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("view-all", {
                      books: borrowedBooks,
                      currentUser: currentUser,
                    })
                  }
                >
                  <Text
                    style={{ marginRight: 20, color: "gray", fontSize: 15 }}
                  >
                    View all books
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={borrowedBooks.slice(0, 5)}
                renderItem={renderBorrowedBooks}
                keyExtractor={(item, index) => index}
              />
            </>
          )}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {filteredBooks.length <= 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 30,
              }}
            >
              <Text
                style={{ fontSize: 25, textAlign: "center", color: "gray" }}
              >
                You don't have a borrowed book yet
              </Text>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 25, marginLeft: 20, fontWeight: "bold" }}
                >
                  Borrowed Books
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("view-all", {
                      books: filteredBooks,
                      currentUser: currentUser,
                    })
                  }
                >
                  <Text
                    style={{ marginRight: 20, color: "gray", fontSize: 15 }}
                  >
                    View all books
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={filteredBooks.slice(0, 5)}
                renderItem={renderBorrowedBooks}
                keyExtractor={(item, index) => index}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
