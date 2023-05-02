import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { showToast } from "../components/toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/loader";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [schoolID, setSchoolID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = () => {
    if (schoolID.length === 0) {
      showToast("error", "School ID must not be empty!");
    } else if (firstName.length === 0) {
      showToast("error", "First name must not be empty!");
    } else if (lastName.length === 0) {
      showToast("error", "Last name must not be empty!");
    } else if (gender.length === 0) {
      showToast("error", "Please select a gender!");
    } else if (course.length === 0) {
      showToast("error", "Please select a course!");
    } else if (yearLevel.length === 0) {
      showToast("error", "Please specify your year level!");
    } else if (password.length === 0) {
      showToast("error", "Password must not be empty!");
    } else if (password.length <= 5) {
      showToast("error", "Password must be greater than 5 characters!");
    } else if (password2.length === 0) {
      showToast("error", "Re-enter password is empty");
    } else if (password2 !== password) {
      showToast("error", "Your password did not match!");
    } else {
      setLoading(true);
      const data = {
        schoolID: schoolID,
        firstName: firstName,
        middleName,
        middleName,
        lastName,
        lastName,
        gender: gender,
        course: course,
        yearLevel: yearLevel,
        password: password,
        createdAt: serverTimestamp(),
      };
      const userRef = collection(db, "users");
      addDoc(userRef, data).then(() => {
        setLoading(false);
        showToast("success", "Successfully Registered");
        navigation.navigate("login");
      });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={{ flex: 0.3, marginTop: 30 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/Mobile-login.jpg")}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginTop: 15,
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
            Create your account
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
            style={{ marginTop: 20, marginHorizontal: 30 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={{ marginVertical: 10 }}>
              <Input label="School ID" event={(text) => setSchoolID(text)} />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Input label="First Name" event={(text) => setFirstName(text)} />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Input
                label="Middle Name"
                event={(text) => setMiddleName(text)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Input label="Last Name" event={(text) => setLastName(text)} />
            </View>
            <View style={{ marginVertical: 10 }}>
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
                defaultButtonText={"Select Gender"}
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
                defaultButtonText={"Select Course"}
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
                defaultButtonText={"Select Year Level"}
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
              <Input label="Password" event={(text) => setPassword(text)} />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Input
                label="Re-enter Password"
                event={(text) => setPassword2(text)}
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
                text={"Register"}
                bgColor={"#E2532F"}
                icon={"account-arrow-up"}
                event={register}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;
