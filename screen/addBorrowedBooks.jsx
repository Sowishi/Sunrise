import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import { showToast } from "../components/toast";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/loader";
import Constants from "expo-constants";

const AddBorrowedBooks = ({ navigation, route }) => {
  const { data, currentUser } = route.params;

  const [loading, setLoading] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookID, setBookID] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userRef = collection(db, "users");
    onSnapshot(userRef, (snapshot) => {
      const returnUser = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user.schoolID === data) {
          returnUser.push(user);
        }
      });
      setUser(returnUser);
    });
  }, []);

  const addBook = () => {
    if (bookName.length === 0) {
      showToast("error", "Book name must not be empty!");
    } else if (author.length === 0) {
      showToast("error", "Author must not be empty!");
    } else if (purpose.length === 0) {
      showToast("error", "Purpose must not be empty!");
    } else if (bookID.length === 0) {
      showToast("error", "Book ID must not be empty!");
    } else {
      setLoading(true);
      const data = {
        issuedTo: user[0],
        createdAt: serverTimestamp(),
        bookName: bookName,
        bookID: bookID,
        purpose: purpose,
        author: author,
      };
      const borrowedRef = collection(db, "borrowed");
      addDoc(borrowedRef, data).then(() => {
        setLoading(false);
        showToast("success", "Successfully Added");
        navigation.navigate("home", { currentUser: currentUser });
      });
    }
  };

  if (user.length === 0) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <View
        style={{
          flex: 1,
          marginTop: Constants.statusBarHeight,
          backgroundColor: "white",
        }}
      >
        <StatusBar />

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginTop: 25,
            paddingTop: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "bold",
              marginHorizontal: 20,
            }}
          >
            Borrow Books!
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{ backgroundColor: "#FEB648", width: "80%", height: 5 }}
            ></View>
          </View>
          <ScrollView
            style={{ marginTop: 20, marginHorizontal: 10 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Issued to:
            </Text>
            <View style={{ marginVertical: 10 }}>
              <Text>School ID</Text>
              <Input
                label={user[0].schoolID}
                enabled={false}
                event={(text) => setSchoolID(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>First Name</Text>

              <Input
                label={user[0].firstName}
                enabled={false}
                event={(text) => setFirstName(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Middle Name</Text>
              <Input
                label={user[0].middleName}
                enabled={false}
                event={(text) => setMiddleName(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Last Name</Text>
              <Input
                label={user[0].lastName}
                enabled={false}
                event={(text) => setLastName(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Gender</Text>

              <SelectDropdown
                data={["Male", "Female", "Prefer not to say"]}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                disabled
                defaultButtonText={user[0].gender}
                buttonStyle={{
                  backgroundColor: "#FEB64899",
                  borderRadius: 5,
                  width: "100%",
                  height: 36,
                }}
                buttonTextStyle={{ fontSize: 15, padding: 0, opacity: 0.5 }}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Course</Text>
              <SelectDropdown
                data={["BSCS", "BSIS", "BSTM", "BSHM", "BSN"]}
                onSelect={(selectedItem, index) => {
                  setCourse(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={user[0].course}
                buttonStyle={{
                  backgroundColor: "#FEB64899",
                  borderRadius: 5,
                  width: "100%",
                  height: 36,
                }}
                disabled
                buttonTextStyle={{ fontSize: 15, padding: 0, opacity: 0.5 }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Year Level</Text>

              <SelectDropdown
                data={[
                  "First Year",
                  "Second Year",
                  "Third Year",
                  "Fourth Year",
                ]}
                onSelect={(selectedItem, index) => {
                  setYearLevel(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                disabled
                defaultButtonText={user[0].yearLevel}
                buttonStyle={{
                  backgroundColor: "#FEB64899",
                  borderRadius: 5,
                  width: "100%",
                  height: 36,
                }}
                buttonTextStyle={{ fontSize: 15, padding: 0, opacity: 0.5 }}
              />
            </View>
            <Text style={{ fontSize: 20, textAlign: "center" }}>Book</Text>
            <View style={{ marginVertical: 10 }}>
              <Text>Book Name</Text>
              <Input
                label={"Please enter the book name"}
                event={(text) => setBookName(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Author</Text>
              <Input
                label={"Please enter the Author"}
                event={(text) => setAuthor(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Purpose</Text>
              <Input
                label={"Please enter the Purpose"}
                event={(text) => setPurpose(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Book ID</Text>
              <Input
                label={"Please enter the Book ID"}
                event={(text) => setBookID(text)}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Button
                text={"Add Book!"}
                bgColor={"#E2532F"}
                icon={"account-arrow-up"}
                event={addBook}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default AddBorrowedBooks;
