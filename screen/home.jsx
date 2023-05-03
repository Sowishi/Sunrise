import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Home = ({ route, navigation }) => {
  const { currentUser } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const borrowedRef = collection(db, "borrowed");
    onSnapshot(borrowedRef, (snapshot) => {
      const books = [];
      snapshot.forEach((doc) => {
        const book = doc.data();
        if (book.issuedTo.schoolID === currentUser.schoolID) {
          books.push(book);
        }
      });
      setBorrowedBooks(books);
    });
  }, []);

  const renderBorrowedBooks = ({ item }) => {
    return (
      <TouchableOpacity>
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

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="white" />
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
        <Image
          resizeMode="contain"
          source={require("../assets/lib-open.png")}
          style={{ width: "100%", height: "100%" }}
        />
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
            <Text style={{ fontSize: 25, textAlign: "center", color: "gray" }}>
              You don't have a borrowed book yet
            </Text>
          </View>
        ) : (
          <>
            <Text style={{ fontSize: 25, marginLeft: 20, fontWeight: "bold" }}>
              Borrowed Books
            </Text>
            <FlatList
              contentContainerStyle={{ paddingBottom: 20 }}
              data={borrowedBooks}
              renderItem={renderBorrowedBooks}
              keyExtractor={(item, index) => index}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Home;
