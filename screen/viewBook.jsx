import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { showToast } from "../components/toast";

const ViewBook = ({ route, navigation }) => {
  const { book, currentUser } = route.params;

  console.log(book);

  const handleConfirmReturn = () => {
    const bookRef = doc(db, "borrowed", book.borrowedID);
    deleteDoc(bookRef).then(() => {
      showToast("success", "Successfull Return Book!");
      navigation.goBack();
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25 }}>{book.bookName}</Text>
        </View>
      </View>
      <LinearGradient
        style={{ flex: 2, margin: 30, borderRadius: 10 }}
        colors={["#DDA033", "#0D97AC"]}
      >
        <ScrollView
          style={{
            flex: 1,
            margin: 30,
          }}
        >
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Issued to: {book.issuedTo.firstName + " " + book.issuedTo.lastName}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            School ID: {book.issuedTo.schoolID}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Book Name: {book.bookName}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Book ID: {book.bookID}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Author: {book.author}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Time Burrowed: {book.createdAt.toDate().toDateString()}
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginVertical: 5 }}>
            Purpose: {book.purpose}
          </Text>
        </ScrollView>
      </LinearGradient>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {currentUser.role === "admin" ? (
          <Button
            event={handleConfirmReturn}
            text={"Confirm"}
            icon={"check"}
            bgColor={"green"}
          />
        ) : (
          <Button
            event={() =>
              navigation.navigate("qrcode", {
                borrowedID: book.borrowedID,
              })
            }
            text={"Return Book"}
            bgColor={"#E2532F"}
          />
        )}
      </View>
    </View>
  );
};

export default ViewBook;
