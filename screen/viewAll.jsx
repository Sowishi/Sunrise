import { View, Text } from "react-native";
import Constants from "expo-constants";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ViewAll = ({ route, navigation }) => {
  const { books, currentUser } = route.params;

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: Constants.statusBarHeight,
      }}
    >
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
        <Text style={{ fontSize: 30 }}>All books</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={books}
        renderItem={renderBorrowedBooks}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default ViewAll;
