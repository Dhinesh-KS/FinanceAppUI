import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import SlidingUpPanel from "rn-sliding-up-panel";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const Users = [
    {
      key: "1",
      userImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Smith",
      transactionDate: "05 April 20",
      amount: "$264",
      credit: false,
    },
    {
      key: "2",
      userImage:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Gabreal",
      transactionDate: "21 April 20",
      amount: "$367",
      credit: true,
    },
    {
      key: "3",
      userImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Andrea",
      transactionDate: "15 May 20",
      amount: "$253",
      credit: true,
    },
    {
      key: "4",
      userImage:
        "https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "John",
      transactionDate: "23 April 20",
      amount: "$342",
      credit: false,
    },
    {
      key: "5",
      userImage:
        "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Chris",
      transactionDate: "05 May 20",
      amount: "$323",
      credit: true,
    },
    {
      key: "6",
      userImage:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Ria",
      transactionDate: "23 Aug 20",
      amount: "$234",
      credit: false,
    },
    {
      key: "8",
      userImage:
        "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      userName: "Mery",
      transactionDate: "13 June 20",
      amount: "$332",
      credit: true,
    },
  ];
  const Images = [
    { image: require("./assets/images/card2.png") },
    { image: require("./assets/images/card3.png") },
    { image: require("./assets/images/card4.png") },
    { image: require("./assets/images/card1.png") },
  ];
  const { width, height } = Dimensions.get("window");
  const carouselRef = useRef(null);
  const RenderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <Image
          source={item.image}
          style={{ width: 320, height: 200, borderRadius: 10 }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const [dragRange, setDragRange] = useState({
    top: height - 50,
    bottom: 160,
  });

  const _draggedValue = new Animated.Value(180);

  const ModalRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50, paddingHorizontal: 14 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 26, color: "#fff" }}>Welcome Back,</Text>
            <Text
              style={{
                fontSize: 26,
                color: "#fff",
                opacity: 0.6,
              }}
            >
              John Smith
            </Text>
          </View>
          <View>
            <Image
              style={styles.profileImage}
              source={{
                uri:
                  "https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              }}
            ></Image>
            <View style={styles.profileImageNotify}></View>
          </View>
        </View>
        <View>
          <Carousel
            layout={"tinder"}
            ref={carouselRef}
            data={Images}
            renderItem={RenderItem}
            sliderWidth={width}
            itemWidth={width - 10}
            swipeThreshold={100}
            layoutCardOffset={-12}
            inactiveSlideOpacity={0.4}
            containerCustomStyle={{ overflow: "visible", marginVertical: 30 }}
            contentContainerCustomStyle={{ paddingTop: 14, left: 0 }}
          />
        </View>
        <View>
          <Text style={{ color: "#fff", opacity: 0.6, marginBottom: 10 }}>
            Send Money
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.AddUser}>
              <View style={styles.AddUserIconbg}>
                <MaterialIcons
                  name="add"
                  color="#808080"
                  size={28}
                  style={{ alignSelf: "center" }}
                />
              </View>
              <Text style={{ color: "#fff" }}>Add Users</Text>
            </TouchableOpacity>
            <FlatList
              horizontal
              data={Users}
              renderItem={({ item }) => {
                return (
                  <View style={styles.AddUser}>
                    <Image
                      style={styles.AddUserIconbg}
                      source={{ uri: item.userImage }}
                    />
                    <Text style={{ color: "#fff" }}>{item.userName}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <SlidingUpPanel
          ref={ModalRef}
          draggableRange={dragRange}
          animatedValue={_draggedValue}
          backdropOpacity={0}
          snappingPoints={[360]}
          height={height + 20}
          friction={0.9}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#0c0c0c",
              borderRadius: 24,
              padding: 14,
            }}
          >
            <View style={styles.PanelHandle}></View>
            <View>
              <Text style={{ marginVertical: 16, color: "#fff" }}>
                Recent Transactions
              </Text>
            </View>
            <View style={{ height: 500, paddingBottom: 10 }}>
              <FlatList
                data={Users}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.PanelItemConatiner}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ marginRight: 10 }}>
                          <Image
                            style={styles.PanelImage}
                            source={{ uri: item.userImage }}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 14, color: "#fff" }}>
                            {item.userName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#fff",
                              opacity: 0.6,
                            }}
                          >
                            {item.transactionDate}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            marginHorizontal: 2,
                          }}
                        >
                          {item.amount}
                          {item.credit ? (
                            <MaterialIcons
                              name="arrow-drop-up"
                              size={22}
                              color="green"
                            />
                          ) : (
                            <MaterialIcons
                              name="arrow-drop-down"
                              size={22}
                              color="#ff3838"
                            />
                          )}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.PanelButton}>
                <Text style={styles.PanelButtonText}>View Full History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0,
  },
  profileImage: { width: 55, height: 55, borderRadius: 40 },
  profileImageNotify: {
    width: 16,
    height: 16,
    backgroundColor: "#a4dd00",
    borderRadius: 8,
    position: "absolute",
    right: -1,
    top: 40,
    borderColor: "#000",
    borderWidth: 2,
  },
  AddUser: {
    height: 140,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0c0c",
    borderRadius: 10,
    marginRight: 14,
  },
  AddUserIconbg: {
    width: 70,
    height: 70,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  PanelHandle: {
    height: 5,
    width: 50,
    backgroundColor: "#666",
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 6,
  },
  PanelItemConatiner: {
    borderWidth: 0.4,
    borderColor: "#666",
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  PanelImage: {
    width: 30,
    height: 30,
    backgroundColor: "#000",
    borderRadius: 40,
  },
  PanelButton: {
    padding: 14,
    width: 200,
    justifyContent: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
  },
  PanelButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  },
});

export default Home;
