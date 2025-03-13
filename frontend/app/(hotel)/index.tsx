import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { useHotelBooking } from "../../script/subscribe";
import { useRouter } from "expo-router";

export default function Hotel() {
  const [hotel, setHotel] = useState("");
  const [location, setLocation] = useState("");
  const [discription, setDiscription] = useState("");

  //
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow access to the gallery.");
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square crop
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  //

  const { subscribeToPlatform } = useHotelBooking();
  const router = useRouter();  // Get router instance

  const handleSubscribe = async () => {
    if (!hotel || !location || !discription || !selectedImage) {
      console.log(hotel)
      console.log(location)
      console.log(discription)
      console.log(selectedImage)
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const tr = await subscribeToPlatform();  // Call the async function
      router.replace("./booking");  // Navigate if successful
  } catch (error) {
      Alert.alert("Error", "Failed to subscribe to platform: " + error.message);
  } finally {
      console.log("Subscription attempt finished");  // Optional cleanup/logging
  }
  

  };

  return (
    <SafeAreaView
    style={{ backgroundColor: "#0E0E0E" }}>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#0E0E0E"}}
      >
        <View
          style={{
            display: "flex",
            width: 390,
            paddingTop: 50.477,
            paddingRight: 0,
            paddingBottom: 21.1,
            paddingLeft: 0,
            flexDirection: "column",
            gap: 50.408,
            alignItems: "flex-start",
            flexWrap: "nowrap",
            backgroundColor: "#0E0E0E",
            position: "relative",
            overflow: "hidden",
            marginTop: 0,
            marginRight: "auto",
            marginBottom: 0,
            marginLeft: "auto",
          }}
        >
          <View
            style={{
              display: "flex",
              paddingLeft: 25,
              flexDirection: "row",
              gap: 3.517,
              alignItems: "center",
              alignSelf: "stretch",
              flexShrink: 0,
              flexWrap: "nowrap",
              position: "relative",
            }}
          >
            <View>
              <Svg width={9} height={16} viewBox="0 0 9 16" fill="none">
                <Path
                  d="M7.57344 1.47705L1.24341 7.80708L7.57344 14.1371"
                  stroke="white"
                  strokeWidth="2.11001"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              paddingTop: 0,
              paddingRight: 21.493,

              paddingBottom: 0,
              paddingLeft: 21.493,
              gap: 29.813,
              alignItems: "flex-start",
              alignSelf: "stretch",
              flexShrink: 0,
              flexWrap: "nowrap",
              position: "relative",
              zIndex: 2,
            }}
          >
            <View
              style={{
                display: "flex",
                gap: 50.267,
                alignItems: "flex-start",
                alignSelf: "stretch",
                flexShrink: 0,
                flexWrap: "nowrap",
                position: "relative",
                zIndex: 3,
              }}
            >
              <View
                style={{
                  display: "flex",
                  gap: 18.72,
                  alignItems: "flex-end",
                  alignSelf: "stretch",
                  flexShrink: 0,
                  flexWrap: "nowrap",
                  position: "relative",
                  zIndex: 4,
                }}
              >
                <Text
                  style={{
                    height: 32,
                    alignSelf: "stretch",
                    flexShrink: 0,
                    flexBasis: "auto",
                    fontFamily: "Inter",
                    fontSize: 32.91166687011719,
                    fontWeight: "600",
                    lineHeight: 31.928,
                    color: "#ffffff",
                    position: "relative",
                    textAlign: "left",
                    zIndex: 5,
                  }}
                  numberOfLines={1}
                >
                  Subscription
                </Text>
                <Text
                  style={{
                    display: "flex",
                    width: 347.013,
                    height: 37,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    flexShrink: 0,
                    fontFamily: "Inter",
                    fontSize: 14.375210762023926,
                    fontWeight: "500",
                    lineHeight: 18.482,
                    color: "#808080",
                    position: "relative",
                    textAlign: "left",
                    zIndex: 6,
                  }}
                >
                  Unlock exclusive benefits, reach more customers, and elevate
                  your restaurant experience!
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  gap: 27.387,
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  flexShrink: 0,
                  flexWrap: "nowrap",
                  position: "relative",
                  zIndex: 7,
                }}
              >
                <Text
                  style={{
                    height: 19,
                    alignSelf: "stretch",
                    flexShrink: 0,
                    flexBasis: "auto",
                    fontFamily: "Inter",
                    fontSize: 14.375210762023926,
                    fontWeight: "600",
                    lineHeight: 18.482,
                    color: "#7f7f7f",
                    position: "relative",
                    textAlign: "left",
                    zIndex: 8,
                  }}
                  numberOfLines={1}
                >
                  Details
                </Text>
                <View
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    flexShrink: 0,
                    flexWrap: "nowrap",
                    position: "relative",
                    zIndex: 9,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      height: 92.56,
                      paddingTop: 25.653,
                      paddingRight: 0,
                      paddingBottom: 25.653,
                      paddingLeft: 0,
                      gap: 3.813,
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      flexWrap: "nowrap",
                      borderBottomWidth: 1.5,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#222222",
                      borderTopWidth: 1.5,
                      borderTopStyle: "solid",
                      borderTopColor: "#222222",

                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <Text
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 11,
                      }}
                      numberOfLines={1}
                    >
                      Name
                    </Text>
                    <TextInput
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 15,
                      }}
                      placeholder="Enter the restaurant name"
                      onChangeText={setHotel}
                      placeholderTextColor="" // Change placeholder color here
                      numberOfLines={1}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      height: 92.56,
                      paddingTop: 25.653,
                      paddingRight: 0,
                      paddingBottom: 25.653,
                      paddingLeft: 0,
                      gap: 3.813,
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      flexWrap: "nowrap",
                      borderBottomWidth: 1.5,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#222222",

                      position: "relative",
                      zIndex: 13,
                    }}
                  >
                    <Text
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 14,
                      }}
                      numberOfLines={1}
                    >
                      Location
                    </Text>
                    <TextInput
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 15,
                      }}
                      placeholder="ex.roorkee,uttrakhand,360579"
                      onChangeText={setLocation}
                      placeholderTextColor="" // Change placeholder color here
                      numberOfLines={1}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      paddingTop: 25.653,
                      paddingRight: 0,
                      paddingBottom: 25.653,
                      paddingLeft: 0,
                      gap: 3.813,
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      flexWrap: "nowrap",
                      borderBottomWidth: 1.5,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#222222",

                      position: "relative",
                      zIndex: 16,
                    }}
                  >
                    <Text
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 17,
                      }}
                      numberOfLines={1}
                    >
                      Description
                    </Text>
                    <TextInput
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 15,
                      }}
                      placeholder="discribe the hotel"
                      onChangeText={setDiscription}
                      placeholderTextColor="" // Change placeholder color here
                      numberOfLines={1}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      paddingTop: 25.653,
                      paddingRight: 0,
                      paddingBottom: 25.653,
                      paddingLeft: 0,
                      gap: 13.867,
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      flexWrap: "nowrap",

                      position: "relative",
                      zIndex: 19,
                    }}
                  >
                    <Text
                      style={{
                        height: 19,
                        alignSelf: "stretch",
                        flexShrink: 0,
                        flexBasis: "auto",
                        fontFamily: "Inter",
                        fontSize: 14.375210762023926,
                        fontWeight: "500",
                        lineHeight: 18.482,
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "left",
                        zIndex: 20,
                      }}
                      numberOfLines={1}
                    >
                      Upload Cover
                    </Text>

                    <TouchableOpacity
                      style={{
                        display: "flex",
                        width: 86.667,
                        height: 86.667,
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        flexWrap: "nowrap",
                        backgroundColor: "#181818",
                        borderTopLeftRadius: 4.853,
                        borderTopRightRadius: 4.853,
                        borderBottomRightRadius: 4.853,
                        borderBottomLeftRadius: 4.853,
                        position: "relative",
                        zIndex: 21,
                      }}
                      onPress={pickImage}
                    >
                      {selectedImage ? (
                        <Image
                          source={{ uri: selectedImage }}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: 4.853,
                            overflow: "hidden", // Ensures image fills the button
                          }}
                        />
                      ) : (
                        <Svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <Path
                            d="M8.49329 18.0122C8.49329 18.41 8.65132 18.7916 8.93263 19.0729C9.21393 19.3542 9.59546 19.5122 9.99329 19.5122C10.3911 19.5122 10.7726 19.3542 11.0539 19.0729C11.3353 18.7916 11.4933 18.41 11.4933 18.0122V11.5122H17.9933C18.3911 11.5122 18.7726 11.3542 19.0539 11.0729C19.3353 10.7916 19.4933 10.41 19.4933 10.0122C19.4933 9.61438 19.3353 9.23285 19.0539 8.95155C18.7726 8.67024 18.3911 8.51221 17.9933 8.51221H11.4933V2.01221C11.4933 1.61438 11.3353 1.23285 11.0539 0.951547C10.7726 0.670242 10.3911 0.512207 9.99329 0.512207C9.59546 0.512207 9.21393 0.670242 8.93263 0.951547C8.65132 1.23285 8.49329 1.61438 8.49329 2.01221V8.51221H1.99329C1.59546 8.51221 1.21393 8.67024 0.932626 8.95155C0.651321 9.23285 0.493286 9.61438 0.493286 10.0122C0.493286 10.41 0.651321 10.7916 0.932626 11.0729C1.21393 11.3542 1.59546 11.5122 1.99329 11.5122H8.49329V18.0122Z"
                            fill="#333333"
                          />
                        </Svg>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                alignSelf: "stretch",
                flexShrink: 0,
                flexWrap: "nowrap",
                position: "relative",
                zIndex: 23,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 61.19,
                  marginTop: 10,
                  paddingTop: 21.452,
                  paddingLeft: 0,
                  paddingBottom: 21.452,
                  paddingRight: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  rowGap: 3.517,
                  columnGap: 3.517,
                  alignSelf: "stretch",
                  borderBottomLeftRadius: 63.652,
                  borderBottomRightRadius: 63.652,
                  borderTopLeftRadius: 63.652,
                  borderTopRightRadius: 63.652,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                }}
                testID="1256:2243"
                onPress={handleSubscribe}
              >
                <Text
                  style={{
                    flexGrow: 1,
                    flexShrink: 0,
                    flexBasis: 0,
                    color: "rgba(0, 0, 0, 1)",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: 14.77,
                    fontStyle: "normal",
                    fontWeight: "600",
                  }}
                  testID="1256:2244"
                >
                  {`Subscribe`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
