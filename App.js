import React, { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, SafeAreaView } from "react-native";

import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const swiperRef = React.createRef();

export default function App() {
  const sart = 0;
  const [index, setIndex] = React.useState(0);
  const [users, setUsers] = useState([]);

  console.log("sıraraaa", index);
  // console.log("qqqqqqqqaaaaaaaaa ",users[0].user_1_full_name);
  useEffect(() => {
    fetch("https://api.mevzu.app/api/bundle/temp/?format=json")
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .then((users) => setUsers(users.meta_data))
      .catch((err) => console.log(err));
  }, []);

  const onSwiped = () => {
    setIndex((index + 1) % users.length);
    // console.log(data[index+1])
  };

  const Card = ({ card }) => {
    let gelen = "https://api.mevzu.app";
    console.log("ğüüüüüüüüüüüü", users);
    if (card) {
      //console.log("isimimmim", card.user_1_full_name);
      return (
        <View style={styles.card} key={card.id}>
          <Image
            source={{ uri: gelen + card.user_1_photo_link }}
            style={styles.cardImage}
          />
          <Image
            source={{ uri: gelen + card.user_2_photo_link }}
            style={styles.cardImage}
          />
          <Text>{card.user_1_full_name} </Text>
          <Text>{card.user_2_full_name}</Text>
          
        </View>
      );
    }
    //console.log("salihhhhhhhh", card.user_1_photo_link);
    //console.log(card.user_2_photo_link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={users}
          cardIndex={index}
          renderCard={(card) => <Card card={card} />}
          infinite
          backgroundColor={"transparent"}
          onSwiped={onSwiped}
          cardVerticalMargin={50}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerButtons}>
          <MaterialCommunityIcons.Button
            name="close"
            size={50}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color="#EC2379" // kırmızı
            onPress={() => swiperRef.current.swipeLeft()}
          />

          <AntDesign.Button
            name="like2"
            size={50}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color="#0070FF" //mavi
            onPress={() => swiperRef.current.swipeRight()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiperContainer: {
    flex: 0.9,
  },
  bottomContainer: {
    flex: 0.1,
    justifyContent: "space-evenly",
  },

  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardImage: {
    width: 370,
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    flex: 1,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
