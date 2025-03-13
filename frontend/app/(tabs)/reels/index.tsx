// ReelsScreen.js
import React, { useState, useRef,useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Animated,
  
  
} from "react-native";
import { Video, ResizeMode } from "expo-av"; // Changed this line
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { Redirect, useRouter,Link } from "expo-router";
import {useHotelReview} from '../../../script/getReviews'
const { width, height } = Dimensions.get("window");
import { useFocusEffect } from '@react-navigation/native';
import {useCallback} from 'react'




// https://v1.pinimg.com/videos/mc/expMp4/de/e5/99/dee599d5db25ccc357a28aa06428cd7a_t3.mp4

// https://v1.pinimg.com/videos/mc/expMp4/df/d9/4c/dfd94cda812af97e67ed349ec73508a4_t3.mp4

// https://v1.pinimg.com/videos/mc/expMp4/17/1a/3c/171a3c57fd78c9a06772f7234276598e_t3.mp4




const ReelItem = ({ item, isInFocus }) => {
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [status, setStatus] = useState({});

  React.useEffect(() => {
    if (videoRef.current) {
      if (isInFocus) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
        videoRef.current.setPositionAsync(0);
      }
    }
  }, [isInFocus]);

  const onLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.reelContainer}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        useNativeControls={false}
      ></Video>
    </View>
  );
};

const reels = () => {

  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [reelsData, setReelsData] = useState([]); // State for fetched reels
  const { getAllReviews } = useHotelReview();
  

   const [refreshKey, setRefreshKey] = useState(0);
  
    useFocusEffect(
      useCallback(() => {
        setRefreshKey(prevKey => prevKey + 1);
       
      }, [])
    );

    useFocusEffect(
      useCallback(() => {
        const fetchReels = async () => {
          const reviews = await getAllReviews();
          const formattedReels = reviews.map((review, index) => ({
            id: index.toString(),
            videoUri: `https://ipfs.io/ipfs/${review.ipfsHash}`,
            avatar: "./assets/avatar1.jpg",
            userName: "@user1",
            address: review.reviewer,
            likes: 1234,
            rating: 4.5,
            description: review.reviewText || "No description",
            hotel: review.hotel || "Unknown",
            location: review.location || "N/A",
          }));
          setReelsData(formattedReels);
        };
    
        fetchReels();
      }, [])
    );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setFocusedIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const [liked, setLiked] = useState(false);
  const lastTap = useRef(null);

  const handleTap = () => {
    const now = Date.now();

    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame114} testID="1293:183">
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Svg
           
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
          >
            <Path
              d="M7.7068 1.38672L1.4668 7.62672L7.7068 13.8667"
              stroke="white"
              strokeWidth={2.08}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <View style={styles.group46} testID="1293:186">
          <View style={styles.frame113} testID="1293:187">
            <Image
              source={require("../../../assets/images/profile1.png")}
              style={styles.profile}
            />
            <View style={styles.frame112} testID="1293:191">
              <Text style={styles.chocolateChips} testID="1293:192">
                {`Richard Ells`}
              </Text>
              <Text style={styles.miltonAbel} testID="1293:193">
                  {`${reelsData[focusedIndex]?.address.slice(0, 14)}...${reelsData[focusedIndex]?.address.slice(-3)}`}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleTap}>
          <Svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill={liked ? "white" : "none"}
          >
            <Path
              d="M14.2581 22.1976L14.2532 22.1976C14.0251 22.1981 13.7991 22.1536 13.5883 22.0665C13.3775 21.9794 13.186 21.8515 13.0249 21.6901L13.0244 21.6897L3.65523 12.3205C3.65463 12.3199 3.65403 12.3193 3.65343 12.3187C3.00716 11.6649 2.49731 10.8892 2.15354 10.0366C1.80945 9.18316 1.63863 8.26982 1.65104 7.34975L1.65108 7.34368C1.65724 6.51046 1.82773 5.68665 2.15277 4.91943C2.47781 4.15221 2.95102 3.45665 3.54529 2.8726C4.13957 2.28854 4.84323 1.82747 5.61597 1.51579C6.38872 1.2041 7.21536 1.04794 8.04856 1.05623L8.05857 1.05633L8.06858 1.05623C8.91669 1.04769 9.75788 1.20955 10.5423 1.53221C11.3266 1.85487 12.0382 2.33176 12.6348 2.9346L12.6348 2.93461L12.6385 2.93829L12.8023 3.10209C13.6049 3.90473 14.9063 3.90473 15.7089 3.10209L15.0018 2.39498L15.7181 3.09278C16.8378 1.94339 18.3361 1.23874 19.9356 1.10933C21.5318 0.980181 23.1207 1.43272 24.4093 2.38324C25.1383 2.94634 25.7394 3.65781 26.173 4.47063C26.608 5.28627 26.8643 6.18523 26.9247 7.10767C26.9852 8.03011 26.8484 8.95483 26.5235 9.82027C26.1987 10.6855 25.6933 11.4717 25.041 12.1264C25.0409 12.1265 25.0407 12.1267 25.0406 12.1268L15.4865 21.69L15.4864 21.6901C15.3252 21.8515 15.1337 21.9794 14.9229 22.0665C14.7121 22.1536 14.4861 22.1981 14.2581 22.1976Z"
              stroke={"white"}
              strokeWidth={2.08}
              stroke-width="2"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <FlatList
        style={[{ zIndex: 0 }]}
        data={reelsData} // Use fetched data instead of REELS_DATA
        renderItem={({ item, index }) => (
          <ReelItem item={item} isInFocus={index === focusedIndex} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
      ></FlatList>

      <View style={styles.frame115} testID="1293:197">
        <View style={styles.frame65} testID="1293:198">
          <View style={styles.frame45} testID="1293:199">
            <View style={styles.frame13} testID="1293:200">
              <View style={styles.frame66} testID="1293:201">
                <Svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5818 12.8543C4.5818 12.8543 0.0712891 9.05561 0.0712891 5.31777C0.0712891 3.99993 0.594796 2.73608 1.52664 1.80423C2.45849 0.872384 3.72235 0.348877 5.04018 0.348877C6.35801 0.348877 7.62187 0.872384 8.55371 1.80423C9.48556 2.73608 10.0091 3.99993 10.0091 5.31777C10.0091 9.05561 5.49856 12.8543 5.49856 12.8543C5.24763 13.0854 4.83459 13.0829 4.5818 12.8543ZM5.04018 7.49166C5.32566 7.49166 5.60834 7.43543 5.87209 7.32618C6.13584 7.21693 6.37548 7.0568 6.57735 6.85494C6.77921 6.65307 6.93934 6.41343 7.04859 6.14968C7.15784 5.88593 7.21407 5.60325 7.21407 5.31777C7.21407 5.03229 7.15784 4.7496 7.04859 4.48586C6.93934 4.22211 6.77921 3.98246 6.57735 3.78059C6.37548 3.57873 6.13584 3.4186 5.87209 3.30935C5.60834 3.20011 5.32566 3.14388 5.04018 3.14388C4.46363 3.14388 3.91069 3.37291 3.50301 3.78059C3.09532 4.18828 2.86629 4.74121 2.86629 5.31777C2.86629 5.89432 3.09532 6.44725 3.50301 6.85494C3.91069 7.26262 4.46363 7.49166 5.04018 7.49166Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </Svg>
                <Text style={styles.fortNegen} testID="1293:204">
                  {`Fort Negen`}
                </Text>
              </View>
              <Text style={styles.painAuChocolat} testID="1293:205">
                {`Sun Dried Meat`}
              </Text>
            </View>
           
            <TouchableOpacity onPress={() => router.push('/reels/hotel')} style={styles.frame67} testID="1293:206">
              <Text style={styles.visitNow}  >
                {`Visit Now`}
              </Text>
            </TouchableOpacity>
           
            
          </View>
        </View>
        <View style={styles.frame71} testID="1293:209">
          <Text
            style={
              styles.steakTartareBecamePopularInThe19ThCenturyInNewYorkItWasOriginallyMadeWithHamburgSteakBecauseOfThe
            }
            testID="1293:210"
          >
            {reelsData[focusedIndex]?.description || "No description available"}    </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    width: 100,
    height: 100,
    backgroundColor: "#000f00",
  },
  back: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
  },

  container: {
    flex: 1,
  },

  reelContainer: {
    width: width,
    height: height,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  rightButtons: {
    position: "absolute",
    right: 10,
    bottom: 150,
    alignItems: "center",
  },
  rightButton: {
    marginTop: 20,
    alignItems: "center",
  },
  statsText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
  },

  profile: {
    height: 42.64,
    width: 42.64,
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 21.32,
  },
  root: {
    flexDirection: "row",
    width: 390,
    paddingTop: 51.653,
    paddingLeft: 0,
    paddingBottom: 26,
    paddingRight: 0,
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
  },
  chocolateChips: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  miltonAbel: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.800000011920929)",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "500",
  },
  frame116: {
    width: 390,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 537.67999,
    columnGap: 537.67999,
    flexShrink: 0,
  },
  frame114: {
    position: "absolute",
    zIndex: 1,
    height: 150,
    flexDirection: "row",
    marginBottom: -150,
    paddingTop: 0,
    paddingLeft: 15.467,
    gap: 10,
    paddingBottom: 0,
    paddingRight: 29.467,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    
  },
  group46: {
    width: 238.983,
    height: 41.947,
    marginRight: 20,
  },
  frame113: {
    flexDirection: "row",
    width: 238.983,
    alignItems: "center",
    rowGap: 7.627,
    columnGap: 7.627,
  },
  frame112: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 1.387,
    columnGap: 1.387,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  fortNegen: {
    marginLeft: 4,
    width: 78,
    height: 17.68,
    color: "rgba(255, 255, 255, 0.6000000238418579)",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "500",
  },
  frame115: {
    position: "absolute",
    bottom: 10.437,
    paddingTop: 0,
    paddingLeft: 20.8,
    paddingBottom: 15,
    paddingRight: 20.8,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 10.053,
    columnGap: 10.053,
    alignSelf: "stretch",
  },
  frame65: {
    paddingTop: 11.44,
    paddingLeft: 11.787,
    paddingBottom: 11.44,
    paddingRight: 11.787,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 15.6,
    borderBottomRightRadius: 15.6,
    borderTopLeftRadius: 15.6,
    borderTopRightRadius: 15.6,
    backgroundColor: "rgba(75, 75, 75, 0.3019607961177826)",
  },
  frame45: {
    width: 282.53299,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 13.173,
    columnGap: 13.173,
  },
  frame13: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 6.427,
    columnGap: 2.427,
    alignSelf: "stretch",
  },
  frame66: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
  },
  painAuChocolat: {
    width: 175.067,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "start",
    fontFamily: "Inter",
    fontSize: 21.493,
    fontStyle: "normal",
    fontWeight: "600",
  },
  visitNow: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "start",
    fontFamily: "Inter",
    fontSize: 13.867,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame67: {
    width: 282.53299,
    height: 39.52,
    backgroundColor: "#ffffff",
    paddingTop: 11.76,
    paddingLeft: 14.8,
    paddingBottom: 11.76,
    borderRadius: 11.44,
  },
  steakTartareBecamePopularInThe19ThCenturyInNewYorkItWasOriginallyMadeWithHamburgSteakBecauseOfThe:
    {

      height:60,
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
      color: "rgba(255, 255, 255, 0.9019607901573181)",
      fontFamily: "Inter",
      fontSize: 14.56,
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: 18.72,
    },
  frame71: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 6.24,
    paddingBottom: 0,
    paddingRight: 6.24,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
  },
});

export default reels;



// https://gateway.pinata.cloud/ipfs/QmbabLjL5TYJteMXUEfVwZTAuTToNFfgHfiCUJ6M1Kbbbw