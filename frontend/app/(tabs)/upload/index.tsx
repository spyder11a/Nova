import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Import Video from expo-av
import axios from "axios";
import { BookingContext } from "../context/BookingContext";
import { useHotelReview } from "../../../script/submitReview";
import { Camera, CameraView } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const upload = () => {
  const { submitReview } = useHotelReview();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hotelAddress, setHotelAddress] = useState(""); // Default text "Review"
  const [ipfsHash, setIpfsHash] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const { addBooking } = useContext(BookingContext);

  const handleBooking = (ipfsHashValue) => {
    const newBooking = {
      ipfsHash: ipfsHashValue,
      hotelAddress,
      review,
      id: Date.now(),
    };

    addBooking(newBooking);
    Alert.alert("Success", "Booking added!");
  };

  // varification

  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState("");
  const [varify, setVarify] = useState(false);

  useEffect(() => {}, [varify]);

  const uploadVideo = async () => {
    if (!video) {
      Alert.alert("Error", "Please select a video first!");
      return;
    }

    if (review.trim() == "" || hotelAddress.trim() == "") {
      Alert.alert("Error", "Both input fields are required");
      return;
    }

    setStatus("🚀 Uploading video...");
    console.log("🚀 Uploading video...");

    const formData = new FormData();
    formData.append("video", {
      uri: video,
      type: "video/mp4",
      name: "upload.mp4",
    });

    try {
      const response = await fetch("http://10.61.114.32:5001/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      console.log(result);
      console.log("ThreatDetected", result.threatDetected);
     
      if (result.threatDetected) {
        setVarify(false);
      } else {
        setVarify(true);
      }

      if (response.ok) {
        console.log("✅ Success:", result.message);
        setStatus(result.message);
      } else {
        console.log("❌ Error:", result.message);
        setStatus(result.message);
      }
    } catch (error) {
      console.error("⚠️ Upload Error:", error);
      Alert.alert("Error", "Failed to upload video. Try again.");
      setStatus("⚠️ Upload failed");
    }
  };

  // main shere funtion used for block things and review submission

  const shere = async () => {
    if (!selectedVideo) {
      Alert.alert("Error", "Select a Video");
      return;
    }
    if (review.trim() == "" || hotelAddress.trim() == "") {
      Alert.alert("Error", "Both input fields are required");
      return;
    }

    setLoading(true);
    try {
      const fileUri = selectedVideo.uri;
      const fileName = fileUri.split("/").pop();

      let formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: "video/mp4",
        name: fileName,
      });

      const headers = {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "09370d9f4e73eead60cf",
        pinata_secret_api_key:
          "8a811ba5b83fd0c629b4c68c94a5e3b65d8d2a09a8fa4cb9e323587dc9a70944",
      };

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        { headers }
      );
      const uploadedHash = response.data.IpfsHash;
      console.log("File uploaded:", uploadedHash);

      try {
        const txHash = await submitReview(
          hotelAddress,
          review,
          uploadedHash,
          rating
        );
        if (txHash === undefined) {
          return;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        Alert.alert("Error", "Failed to submit review: " + errorMessage);
        console.log("❌ Review submission failed:", errorMessage);
        return;
      }

      // ✅ Wait for state to update, then add booking
      setIpfsHash(uploadedHash);
      handleBooking(uploadedHash);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access media."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedVideo(result.assets[0]);
      setVideo(result.assets[0].uri);
    } else {
      Alert.alert("Error", "No video selected.");
    }
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        // Scroll to bottom with smooth animation when keyboard opens
        scrollViewRef.current?.scrollToEnd({ animated: true, duration: 10 });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //scanner

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    const extractedAddress = data.includes(":") ? data.split(":")[1] : data;
    setHotelAddress(extractedAddress);
  };

  if (hasPermission === null) {
    console.log("camera");
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Request Permission"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        />
      </SafeAreaView>
    );
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ backgroundColor: "rgba(14, 14, 14, 1)" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: keyboardVisible ? 30 : 0, // Add extra margin when keyboard is visible
        }}
      >
        {isFocused && !scanned ? (
          <CameraView
            style={styles.fullScreenCamera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
          />
        ) : (
          <View style={styles.root}>
            <View style={styles.frame22} testID="1269:3">
              <Svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                <Path
                  d="M7.57319 1.47705L1.24316 7.80708L7.57319 14.1371"
                  stroke="white"
                  strokeWidth="2.11001"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <View style={styles.frame101} testID="1269:5">
              <Text style={styles.newPost} testID="1269:6">
                {`New Post`}
              </Text>
            </View>
            <View style={styles.frame100} testID="1269:7">
              <View style={styles.frame99} testID="1269:8">
                <TouchableOpacity style={styles.frame45} onPress={pickVideo}>
                  {selectedVideo ? (
                    <Video
                      source={{ uri: selectedVideo.uri }}
                      style={styles.video} // Full cover video
                      useNativeControls
                      resizeMode="cover" // Ensures video covers the whole div
                    />
                  ) : (
                    <View style={styles.frame46}>
                      <Svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                      >
                        <Path
                          d="M28.0456 19.1449C27.6649 19.1449 27.2998 19.2961 27.0307 19.5653C26.7615 19.8344 26.6103 20.1995 26.6103 20.5802V21.1255L24.4862 19.0014C23.7361 18.2573 22.7224 17.8397 21.6659 17.8397C20.6094 17.8397 19.5957 18.2573 18.8457 19.0014L17.841 20.0061L14.2816 16.4467C13.5211 15.7227 12.5113 15.319 11.4614 15.319C10.4114 15.319 9.40162 15.7227 8.64112 16.4467L6.51696 18.5708V10.5335C6.51696 10.1528 6.66818 9.78777 6.93734 9.51861C7.2065 9.24945 7.57155 9.09824 7.9522 9.09824H17.9989C18.3795 9.09824 18.7446 8.94703 19.0137 8.67787C19.2829 8.40871 19.4341 8.04365 19.4341 7.663C19.4341 7.28235 19.2829 6.91729 19.0137 6.64813C18.7446 6.37897 18.3795 6.22776 17.9989 6.22776H7.9522C6.81026 6.22776 5.71508 6.6814 4.9076 7.48888C4.10012 8.29636 3.64648 9.39153 3.64648 10.5335V27.7564C3.64648 28.8983 4.10012 29.9935 4.9076 30.801C5.71508 31.6084 6.81026 32.0621 7.9522 32.0621H25.1751C26.317 32.0621 27.4122 31.6084 28.2197 30.801C29.0272 29.9935 29.4808 28.8983 29.4808 27.7564V20.5802C29.4808 20.1995 29.3296 19.8344 29.0604 19.5653C28.7913 19.2961 28.4262 19.1449 28.0456 19.1449ZM7.9522 29.1916C7.57155 29.1916 7.2065 29.0404 6.93734 28.7712C6.66818 28.5021 6.51696 28.137 6.51696 27.7564V22.6325L10.6792 18.4704C10.89 18.2694 11.1701 18.1573 11.4614 18.1573C11.7526 18.1573 12.0327 18.2694 12.2436 18.4704L16.7933 23.0201L22.9648 29.1916H7.9522ZM26.6103 27.7564C26.6072 28.0309 26.5168 28.2974 26.352 28.517L19.879 22.0154L20.8837 21.0107C20.9866 20.9057 21.1094 20.8223 21.245 20.7653C21.3805 20.7084 21.5261 20.679 21.6731 20.679C21.8201 20.679 21.9657 20.7084 22.1012 20.7653C22.2368 20.8223 22.3596 20.9057 22.4625 21.0107L26.6103 25.1873V27.7564ZM33.3703 6.64398L29.0646 2.33826C28.9281 2.2076 28.7671 2.10517 28.5909 2.03686C28.2415 1.89331 27.8496 1.89331 27.5002 2.03686C27.324 2.10517 27.163 2.2076 27.0265 2.33826L22.7208 6.64398C22.4506 6.91424 22.2987 7.28079 22.2987 7.663C22.2987 8.04521 22.4506 8.41176 22.7208 8.68202C22.9911 8.95228 23.3576 9.10411 23.7398 9.10411C24.122 9.10411 24.4886 8.95228 24.7589 8.68202L26.6103 6.81621V14.8392C26.6103 15.2198 26.7615 15.5849 27.0307 15.8541C27.2998 16.1232 27.6649 16.2744 28.0456 16.2744C28.4262 16.2744 28.7913 16.1232 29.0604 15.8541C29.3296 15.5849 29.4808 15.2198 29.4808 14.8392V6.81621L31.3323 8.68202C31.4657 8.81654 31.6244 8.92332 31.7993 8.99618C31.9742 9.06905 32.1618 9.10656 32.3513 9.10656C32.5407 9.10656 32.7283 9.06905 32.9032 8.99618C33.0781 8.92332 33.2369 8.81654 33.3703 8.68202C33.5048 8.5486 33.6116 8.38986 33.6845 8.21496C33.7573 8.04006 33.7948 7.85247 33.7948 7.663C33.7948 7.47353 33.7573 7.28594 33.6845 7.11104C33.6116 6.93614 33.5048 6.7774 33.3703 6.64398Z"
                          fill="#868686"
                          fill-opacity="0.6"
                        />
                      </Svg>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.group44} testID="1269:12">
                <View style={styles.frame79} testID="1269:13">
                  <View style={styles.frame113} testID="1276:176">
                    <View style={styles.frame792} testID="1269:14">
                      <TextInput
                        style={[
                          styles.input,
                          {
                            color: hotelAddress === "" ? "#888" : "#fff",
                          },
                        ]} // Change text color
                        onChangeText={setHotelAddress}
                        placeholder="hotel address"
                        value={hotelAddress} // Truncated format
                        placeholderTextColor="#888"
                        selectionColor="#fff" // Cursor color
                      />
                    </View>
                    <View style={styles.frame792} testID="1269:14">
                      <TextInput
                        style={[
                          styles.input,
                          {
                            color: hotelAddress === "" ? "#888" : "#fff",
                          },
                        ]} // Change text color
                        onChangeText={(text) => {
                          // Allow only numbers
                          const numericText = text.replace(/[^0-9]/g, "");
                          setRating(numericText);
                        }}
                        placeholder="Rate"
                        placeholderTextColor="#888"
                        selectionColor="#fff" // Cursor color
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.frame80} testID="1269:19">
                      <TextInput
                        style={[
                          styles.input,
                          {
                            color: review === "" ? "#888" : "#fff",
                          },
                        ]} // Change text color
                        onChangeText={setReview}
                        placeholder="Enter Your Review"
                        placeholderTextColor="#888"
                        selectionColor="#fff" // Cursor color
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.frame43} testID="1269:21">
                  {varify ? (
                    <Text
                      style={{
                        color: "#00D24D",
                        width: 80,
                        fontSize: 17,
                        fontWeight: 700,
                      }}
                    >
                      Varified
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#00D24D",
                        width: 80,
                        fontSize: 17,
                        fontWeight: 700,
                      }}
                    >
                    
                    </Text>
                  )}
                  {varify ? (
                    <TouchableOpacity
                      onPress={shere}
                      style={styles.frame115}
                      testID="1276:178"
                      disabled={loading}
                    >
                      <View style={styles.frame114} testID="1276:177">
                        {loading ? (
                          <ActivityIndicator size={18} color="#000000" />
                        ) : (
                          <>
                            <Svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <Path
                                d="M5.16853 6.80239L5.16712 6.80379L5.16431 6.8059L5.15728 6.81153C5.12675 6.8347 5.09719 6.8591 5.06866 6.88468C4.99502 6.9499 4.92416 7.01818 4.85625 7.08935C4.68745 7.26729 4.47082 7.53175 4.26756 7.88553C3.85821 8.59941 3.51428 9.66356 3.7077 11.0864C3.8983 12.491 4.4884 13.6648 5.48573 14.4835C6.48025 15.2994 7.82644 15.7186 9.45466 15.7186C11.1335 15.7186 12.4741 15.0891 13.361 14.0095C14.2402 12.9397 14.6326 11.4803 14.5391 9.88511C14.4491 8.35465 13.6156 7.19344 12.8792 6.16798L12.6689 5.87469C11.8657 4.74091 11.232 3.69645 11.386 2.23492C11.3938 2.16136 11.386 2.08699 11.3632 2.01663C11.3404 1.94626 11.303 1.88149 11.2536 1.8265C11.2041 1.77152 11.1436 1.72756 11.076 1.69747C11.0084 1.66738 10.9353 1.65184 10.8613 1.65186C10.5927 1.65186 10.2846 1.73485 9.98779 1.86004C9.6441 2.0074 9.31978 2.19637 9.02211 2.42271C8.37152 2.91364 7.72094 3.65355 7.37419 4.64244C7.02815 5.62852 7.20398 6.56818 7.45719 7.25252C7.62388 7.70196 7.44312 8.14576 7.17093 8.27517C7.05511 8.32996 6.9226 8.33787 6.8011 8.29724C6.67959 8.2566 6.57849 8.17058 6.51894 8.05714L5.95205 6.98033C5.91657 6.91278 5.86685 6.85373 5.80634 6.80725C5.74582 6.76078 5.67594 6.72798 5.60152 6.71113C5.52711 6.69428 5.44992 6.69378 5.37528 6.70966C5.30065 6.72553 5.23035 6.75741 5.16923 6.80309"
                                fill="black"
                              />
                            </Svg>
                            <Text style={styles.share} testID="1269:24">
                              Shere
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={uploadVideo}
                      style={styles.frame115}
                      testID="1276:178"
                      disabled={loading}
                    >
                      <View style={styles.frame114} testID="1276:177">
                        {loading ? (
                          <ActivityIndicator size={18} color="#000000" />
                        ) : (
                          <>
                            <Svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <Path
                                d="M5.16853 6.80239L5.16712 6.80379L5.16431 6.8059L5.15728 6.81153C5.12675 6.8347 5.09719 6.8591 5.06866 6.88468C4.99502 6.9499 4.92416 7.01818 4.85625 7.08935C4.68745 7.26729 4.47082 7.53175 4.26756 7.88553C3.85821 8.59941 3.51428 9.66356 3.7077 11.0864C3.8983 12.491 4.4884 13.6648 5.48573 14.4835C6.48025 15.2994 7.82644 15.7186 9.45466 15.7186C11.1335 15.7186 12.4741 15.0891 13.361 14.0095C14.2402 12.9397 14.6326 11.4803 14.5391 9.88511C14.4491 8.35465 13.6156 7.19344 12.8792 6.16798L12.6689 5.87469C11.8657 4.74091 11.232 3.69645 11.386 2.23492C11.3938 2.16136 11.386 2.08699 11.3632 2.01663C11.3404 1.94626 11.303 1.88149 11.2536 1.8265C11.2041 1.77152 11.1436 1.72756 11.076 1.69747C11.0084 1.66738 10.9353 1.65184 10.8613 1.65186C10.5927 1.65186 10.2846 1.73485 9.98779 1.86004C9.6441 2.0074 9.31978 2.19637 9.02211 2.42271C8.37152 2.91364 7.72094 3.65355 7.37419 4.64244C7.02815 5.62852 7.20398 6.56818 7.45719 7.25252C7.62388 7.70196 7.44312 8.14576 7.17093 8.27517C7.05511 8.32996 6.9226 8.33787 6.8011 8.29724C6.67959 8.2566 6.57849 8.17058 6.51894 8.05714L5.95205 6.98033C5.91657 6.91278 5.86685 6.85373 5.80634 6.80725C5.74582 6.76078 5.67594 6.72798 5.60152 6.71113C5.52711 6.69428 5.44992 6.69378 5.37528 6.70966C5.30065 6.72553 5.23035 6.75741 5.16923 6.80309"
                                fill="black"
                              />
                            </Svg>
                            <Text style={styles.share} testID="1269:24">
                              Varify
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  fullScreenCamera: {
    width: 390,
    height: 850,
    position: "absolute",
    top: 0,
    left: 0,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },

  data: {
    paddingLeft: 22,
    paddingRight: 22,

    gap: 10,
  },
  IPFS: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.6000000238418579)",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.99,
  },
  video: {
    flexDirection: "row",
    height: 481.508,
    paddingTop: 222.95799,
    paddingLeft: 156.84399,
    paddingBottom: 222.95799,
    paddingRight: 156.84399,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderBottomLeftRadius: 51.302,
    borderBottomRightRadius: 51.302,
    borderTopLeftRadius: 51.302,
    borderTopRightRadius: 51.302,
    backgroundColor: "rgba(217, 217, 217, 0.05098039284348488)",
  },
  root: {
    width: 390,
    height: 1150,
    paddingTop: 79.477,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-start",
    rowGap: 33.408,
    columnGap: 33.408,
    backgroundColor: "#rgba(14, 14, 14, 1)",
  },
  frame22: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 30.243,
    paddingBottom: 0,
    paddingRight: 30.243,
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    alignSelf: "stretch",
  },
  newPost: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 33.386,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 42.925,
  },
  frame101: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 28.133,
    paddingBottom: 0,
    paddingRight: 28.133,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    alignSelf: "stretch",
  },
  frame100: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 37.98,
    columnGap: 37.98,
    alignSelf: "stretch",
  },
  frame99: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 21.1,
    paddingBottom: 0,
    paddingRight: 21.1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    alignSelf: "stretch",
  },
  frame45: {
    flexDirection: "row",
    height: 481.508,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderBottomLeftRadius: 51.302,
    borderBottomRightRadius: 51.302,
    borderTopLeftRadius: 51.302,
    borderTopRightRadius: 51.302,
    backgroundColor: "rgba(217, 217, 217, 0.05098039284348488)",
  },
  frame46: {
    flexDirection: "row",
    height: 481.508,
    paddingTop: 222.95799,
    paddingLeft: 156.84399,
    paddingBottom: 222.95799,
    paddingRight: 156.84399,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderBottomLeftRadius: 51.302,
    borderBottomRightRadius: 51.302,
    borderTopLeftRadius: 51.302,
    borderTopRightRadius: 51.302,
    backgroundColor: "rgba(217, 217, 217, 0.05098039284348488)",
  },
  hotelAddress: {
    width: 332.854,
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.4000000059604645)",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.663,
  },
  group44: {
    height: 262.384,
    alignSelf: "stretch",
  },
  frame79: {
    width: 390,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 33.057,
    columnGap: 33.057,
  },
  frame113: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  frame792: {
    flexDirection: "row",
    paddingTop: 25.672,
    paddingLeft: 21.1,
    paddingBottom: 25.672,
    paddingRight: 21.1,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(24, 24, 24, 1)",
  },

  input: {
    width: 350,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.9019607901573181)",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.99,
  },
  steakTartareBecamePopularInThe19ThCenturyInNewYorkItWasOriginallyMadeWithHamburgSteakBecauseOfThe:
    {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
      alignSelf: "stretch",
      backgroundColor: "#00ff00",
      fontFamily: "Inter",
      fontSize: 14.77,
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 18.99,
    },
  frame80: {
    flexDirection: "row",
    paddingTop: 25.672,
    paddingLeft: 21.1,
    paddingBottom: 25.672,
    paddingRight: 0,
    alignItems: "center",
    alignSelf: "stretch",
  },
  share: {
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 18.663,
  },
  frame43: {
    paddingTop: 50,
    paddingLeft: 32.1,
    width: 390,
    paddingBottom: 0,
    paddingRight: 21.1,
    flexDirection: "column",
    justifyContent: "end-column",
    alignItems: "center",
    flexDirection: "row",
    columnGap: "164.85",
    alignSelf: "stretch",
  },
  frame115: {
    minWidth: 97.06,
    height: 50.64,
    paddingTop: 15,
    paddingLeft: 17,
    paddingBottom: 15,
    paddingRight: 17,
    flexDirection: "column",
    alignItems: "flex-center",
    justifyContent: "center",

    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 32.353,
    borderBottomRightRadius: 32.353,
    borderTopLeftRadius: 32.353,
    borderTopRightRadius: 32.353,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  frame114: {
    flexDirection: "row",
    alignItems: "center", // Fix: "flex-center" is incorrect, use "center"
    justifyContent: "center", // Ensures horizontal centering
    rowGap: 4,
    columnGap: 4,
  },
});

export default upload;
