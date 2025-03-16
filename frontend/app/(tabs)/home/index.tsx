import {
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { useThemeContext } from "../../context/ThemeContext";
const handelHotal = () => {
  Alert.alert("Error", "Both input fields are required");
};

const home = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(1);
  const { toggleTheme, isDarkMode, theme } = useThemeContext();

  const handelHotal = () => {
    router.push("/home/hotel");
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
    >
      <View style={[styles.root, { backgroundColor: theme.background }]}>
        <View style={styles.statusBarIPhone1313Pro} testID="1090:969"></View>
        <View style={styles.frame39} testID="1090:970">
          <View style={styles.frame41} testID="1090:971">
            <Text
              style={[styles.helloKai, { color: theme.text_primary }]}
              testID="1090:972"
            >
              {`hello Kai,`}
            </Text>
            <ImageBackground
              source={require("../../../assets/images/profile.png")}
              style={styles.profile}
            >
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                style={styles.profile}
              ></TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.frame38} testID="1090:977">
            <View
              style={[styles.frame35, { backgroundColor: theme.primary }]}
              testID="1090:978"
            >
              <View style={styles.frame89} testID="1090:979">
                <View style={styles.feSearch} testID="1090:980">
                  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.6661 13.7922L21.4568 19.5428C21.6603 19.7451 21.7746 20.0194 21.7745 20.3053C21.7744 20.5913 21.66 20.8655 21.4563 21.0676C21.2526 21.2697 20.9764 21.3832 20.6885 21.3831C20.4005 21.383 20.1244 21.2693 19.9209 21.0671L14.1302 15.3164C12.3991 16.6479 10.2223 17.2745 8.0425 17.0687C5.86275 16.8629 3.84381 15.8402 2.3964 14.2087C0.948992 12.5771 0.181838 10.4592 0.251006 8.28588C0.320173 6.11254 1.22046 4.047 2.76873 2.50945C4.317 0.971901 6.39694 0.0778427 8.58543 0.00915444C10.7739 -0.0595338 12.9066 0.702308 14.5495 2.1397C16.1925 3.57708 17.2223 5.58205 17.4295 7.74671C17.6367 9.91137 17.0058 12.0731 15.665 13.7922M8.85824 14.9691C10.571 14.9691 12.2136 14.2934 13.4248 13.0906C14.6359 11.8879 15.3163 10.2566 15.3163 8.55572C15.3163 6.8548 14.6359 5.22354 13.4248 4.02081C12.2136 2.81808 10.571 2.14239 8.85824 2.14239C7.14545 2.14239 5.50283 2.81808 4.29171 4.02081C3.08059 5.22354 2.40019 6.8548 2.40019 8.55572C2.40019 10.2566 3.08059 11.8879 4.29171 13.0906C5.50283 14.2934 7.14545 14.9691 8.85824 14.9691Z"
                      fill="#8F8F8F"
                    />
                  </Svg>
                </View>
                <View style={styles.group34} testID="1090:983">
                  <Text style={styles.search} testID="1090:984">
                    {`Search`}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
              <View style={styles.frame1} testID="1090:985">
                <Pressable
                  // style={[styles.frame25, selected === 1 && styles._frame25,] }
                  style={[
                    styles.frame25,
                    isDarkMode
                      ? selected === 1
                        ? { backgroundColor: "#ffffff" } // Dark mode + selected
                        : {
                            backgroundColor:
                              "rgba(217, 217, 217, 0.10196078568696976)",
                          } // Dark mode + not selected
                      : selected === 1
                      ? { backgroundColor: theme.text_primary } // Light mode + selected
                      : { backgroundColor: theme.primary }, // Light mode + not selected
                  ]}
                  onPress={() => setSelected(1)}
                >
                  <Text
                    style={[
                      styles.tranding,
                      isDarkMode
                        ? selected === 1
                          ? { color: theme.text_tertiary } // Dark mode + selected
                          : { color: theme.text_secondary } // Dark mode + not selected
                        : selected === 1
                        ? { color: theme.text_tertiary } // Light mode + selected
                        : { color: theme.text_secondary }, // Light mode + not selected
                    ]}
                    testID="1090:987"
                  >
                    {`Tranding`}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.frame25,
                    isDarkMode
                      ? selected === 2
                        ? { backgroundColor: "#ffffff" } // Dark mode + selected
                        : {
                            backgroundColor:
                              "rgba(217, 217, 217, 0.10196078568696976)",
                          } // Dark mode + not selected
                      : selected === 2
                      ? { backgroundColor: theme.text_primary } // Light mode + selected
                      : { backgroundColor: theme.primary }, // Light mode + not selected
                  ]}
                  onPress={() => setSelected(2)}
                >
                  <Text
                    style={[
                      styles.tranding,
                      isDarkMode
                        ? selected === 2
                          ? { color: theme.text_tertiary } // Dark mode + selected
                          : { color: theme.text_secondary } // Dark mode + not selected
                        : selected === 2
                        ? { color: theme.text_tertiary } // Light mode + selected
                        : { color: theme.text_secondary }, // Light mode + not selected
                    ]}
                    testID="1090:987"
                  >
                    {`Cafe`}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.frame25,
                    isDarkMode
                      ? selected === 3
                        ? { backgroundColor: "#ffffff" } // Dark mode + selected
                        : {
                            backgroundColor:
                              "rgba(217, 217, 217, 0.10196078568696976)",
                          } // Dark mode + not selected
                      : selected === 3
                      ? { backgroundColor: theme.text_primary } // Light mode + selected
                      : { backgroundColor: theme.primary }, // Light mode + not selected
                  ]}
                  onPress={() => setSelected(3)}
                >
                  <Text
                    style={[
                      styles.tranding,
                      isDarkMode
                        ? selected === 3
                          ? { color: theme.text_tertiary } // Dark mode + selected
                          : { color: theme.text_secondary } // Dark mode + not selected
                        : selected === 3
                        ? { color: theme.text_tertiary } // Light mode + selected
                        : { color: theme.text_secondary }, // Light mode + not selected
                    ]}
                    testID="1090:987"
                  >
                    {`Dinner`}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.frame25,
                    isDarkMode
                      ? selected === 4
                        ? { backgroundColor: "#ffffff" } // Dark mode + selected
                        : {
                            backgroundColor:
                              "rgba(217, 217, 217, 0.10196078568696976)",
                          } // Dark mode + not selected
                      : selected === 4
                      ? { backgroundColor: theme.text_primary } // Light mode + selected
                      : { backgroundColor: theme.primary }, // Light mode + not selected
                  ]}
                  onPress={() => setSelected(4)}
                >
                  <Text
                    style={[
                      styles.tranding,
                      isDarkMode
                        ? selected === 4
                          ? { color: theme.text_tertiary } // Dark mode + selected
                          : { color: theme.text_secondary } // Dark mode + not selected
                        : selected === 4
                        ? { color: theme.text_tertiary } // Light mode + selected
                        : { color: theme.text_secondary }, // Light mode + not selected
                    ]}
                    testID="1090:987"
                  >
                    {`Buffet`}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>

            <Text
              style={[styles.restaurants, { color: theme.text_primary }]}
              testID="1090:992"
            >
              {`Restaurants`}
            </Text>
          </View>

          {selected == 1 ? (
            <>
              <ImageBackground
                source={
                  isDarkMode
                    ? require("../../../assets/images/_dinner1.png")
                    : require("../../../assets/images/food9.png")
                }
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        <View style={{marginTop:2}}>
                        <Svg  width="11" height="14" viewBox="0 0 11 14" fill="none">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.45192 12.9488C5.45192 12.9488 0.941406 9.1501 0.941406 5.41225C0.941406 4.09442 1.46491 2.83056 2.39676 1.89871C3.32861 0.966866 4.59246 0.443359 5.9103 0.443359C7.22813 0.443359 8.49198 0.966866 9.42383 1.89871C10.3557 2.83056 10.8792 4.09442 10.8792 5.41225C10.8792 9.1501 6.36867 12.9488 6.36867 12.9488C6.11775 13.1799 5.70471 13.1774 5.45192 12.9488ZM5.9103 7.58614C6.19577 7.58614 6.47846 7.52991 6.74221 7.42066C7.00595 7.31141 7.2456 7.15128 7.44747 6.94942C7.64933 6.74756 7.80946 6.50791 7.91871 6.24416C8.02795 5.98041 8.08418 5.69773 8.08418 5.41225C8.08418 5.12677 8.02795 4.84409 7.91871 4.58034C7.80946 4.31659 7.64933 4.07694 7.44747 3.87508C7.2456 3.67321 7.00595 3.51309 6.74221 3.40384C6.47846 3.29459 6.19577 3.23836 5.9103 3.23836C5.33374 3.23836 4.78081 3.46739 4.37312 3.87508C3.96544 4.28276 3.73641 4.8357 3.73641 5.41225C3.73641 5.9888 3.96544 6.54174 4.37312 6.94942C4.78081 7.3571 5.33374 7.58614 5.9103 7.58614Z" fill={theme.text_primary}/>
                                    </Svg>
                        </View>
                      
                       
                        
                        <Text
                          style={[
                            styles.roorkee,
                            {
                              color: theme.text_primary,
                            },
                          ]}
                          testID="1090:999"
                        >
                          {`Roorkee`}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 5,
                          width: 5,
                          backgroundColor: theme.text_primary,
                          borderRadius: 4,
                        }}
                      />
                      <View style={styles.group78} testID="1090:1001">
                        <Text
                          style={[styles.$35, { color: theme.text_primary }]}
                          testID="1090:1002"
                        >
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          <Svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                          >
                            <Path
                              d="M7.43297 0.794189L9.58147 5.14803L14.3865 5.84617L10.9097 9.23515L11.7302 14.0205L7.43297 11.7612L3.13545 14.0205L3.95625 9.23515L0.479492 5.84617L5.28421 5.14803L7.43297 0.794189Z"
                              fill="#FAC917"
                            />
                          </Svg>
                        </View>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.painAuChocolat,
                        {
                          color: theme.text_primary,
                        },
                      ]}
                      testID="1090:1005"
                    >
                      {`Sun Dried Meat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
              <ImageBackground
                source={require("../../../assets/images/b.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
            </>
          ) : (
            <></>
          )}
          {selected == 2 ? (
            <>
              <ImageBackground
                source={require("../../../assets/images/cafe1.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
              <ImageBackground
                source={require("../../../assets/images/cafe2.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
            </>
          ) : (
            <></>
          )}
          {selected == 3 ? (
            <>
              <ImageBackground
                source={require("../../../assets/images/dinner2.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
              <ImageBackground
                source={require("../../../assets/images/dinner1.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
            </>
          ) : (
            <></>
          )}
          {selected == 4 ? (
            <>
              <ImageBackground
                source={require("../../../assets/images/c.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
              <ImageBackground
                source={require("../../../assets/images/b.png")}
                style={styles.frame892}
                testID="1090:993"
              >
                <Pressable onPress={handelHotal} style={styles.hotel}>
                  <View style={styles.frame13} testID="1090:994">
                    <View style={styles.frame72} testID="1090:995">
                      <View style={styles.group79} testID="1090:996">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1090:999">
                          {`Roorkee`}
                        </Text>
                      </View>
                      {/* <Image url={ellipse10} width={3.47} height={3.47}/> */}
                      <View style={styles.group78} testID="1090:1001">
                        <Text style={styles.$35} testID="1090:1002">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1090:1003">
                          {/* <Vector2/> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.painAuChocolat} testID="1090:1005">
                      {`Pain au Chocolat`}
                    </Text>
                  </View>
                </Pressable>
                {/* <LinearGradient
//   colors={['transparent', 'transparent']} // Gradient colors (from black to transparent)
style={styles.gradient}
> */}

                {/* </LinearGradient> */}
              </ImageBackground>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hotel: {
    height: 487.41299,

    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
    overflow: "hidden", // Ensures that content respects border radius
    borderRadius: 26,
  },
  profile: {
    height: 56.85,
    width: 56.85,
    overflow: "hidden",
    borderRadius: 28.425,
  },

  gradient: {
    height: 487.41299,
    paddingTop: 31.2,
    paddingLeft: 20.8,
    paddingBottom: 31.2,
    paddingRight: 20.8,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
    overflow: "hidden", // Ensures that content respects border radius
    borderRadius: 26,
    backgroundColor: "rgba(196, 196, 196, 0.10196078568696976)",
  },
  root: {
    minHeight: 845.302,
    paddingTop: 0,
    paddingLeft: 14.8,
    paddingBottom: 23.92,
    paddingRight: 14.8,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 6.933,
    columnGap: 6.933,
    backgroundColor: "rgba(14, 14, 14, 1)",
  },
  statusBarIPhone1313Pro: {
    width: 390.14401,
    height: 47.017,
  },
  helloKai: {
    width: 206.267,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 37.44,
    fontStyle: "normal",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  frame39: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 21.84,
    columnGap: 21.84,
    alignSelf: "stretch",
  },
  frame41: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frame38: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 24.613,
    columnGap: 24.613,
    alignSelf: "stretch",
  },
  frame35: {
    height: 47.493,
    paddingTop: 11.747,
    paddingLeft: 14.867,
    paddingBottom: 14.747,
    paddingRight: 13.867,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
    borderBottomLeftRadius: 35.013,
    borderBottomRightRadius: 35.013,
    borderTopLeftRadius: 35.013,
    borderTopRightRadius: 35.013,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  frame89: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 11.787,
    columnGap: 11.787,
    alignSelf: "stretch",
  },
  feSearch: {
    width: 25.832,
    paddingTop: 2.08,
    paddingLeft: 2.08,
    paddingBottom: 2.08,
    paddingRight: 2.08,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
  },
  search: {
    width: 48.523,
    color: "rgba(143, 143, 143, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "400",
  },
  group34: {
    width: 48.523,
    height: 18,
  },
  tranding: {
    color: "#D3D3D3",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.582,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.053,
  },
  _tranding: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.582,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.053,
  },
  frame1: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 7.28,
    columnGap: 7.28,
    alignSelf: "stretch",
  },
  frame25: {
    flexDirection: "row",
    height: 45.067,
    paddingTop: 14.907,
    paddingLeft: 22.187,
    paddingBottom: 11.907,
    paddingRight: 22.187,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 43.333,
    borderBottomRightRadius: 43.333,
    borderTopLeftRadius: 43.333,
    borderTopRightRadius: 43.333,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  _frame25: {
    flexDirection: "row",
    height: 45.067,
    paddingTop: 14.907,
    paddingLeft: 22.187,
    paddingBottom: 11.907,
    paddingRight: 22.187,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 43.333,
    borderBottomRightRadius: 43.333,
    borderTopLeftRadius: 43.333,
    borderTopRightRadius: 43.333,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  expensive: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.582,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.053,
  },
  frame27: {
    flexDirection: "row",
    height: 45.067,
    paddingTop: 14.907,
    paddingLeft: 22.187,
    paddingBottom: 11.907,
    paddingRight: 22.187,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 43.333,
    borderBottomRightRadius: 43.333,
    borderTopLeftRadius: 43.333,
    borderTopRightRadius: 43.333,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  vagitarian: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.582,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.053,
  },
  frame26: {
    flexDirection: "row",
    height: 45.067,
    paddingTop: 14.907,
    paddingLeft: 22.187,
    paddingBottom: 11.907,
    paddingRight: 22.187,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderRadius: 43.333,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  restaurants: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 18.624,
    fontStyle: "normal",
    fontWeight: "600",
  },
  roorkee: {
    color: "rgba(255, 255, 255, 0.800000011920929)",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "500",
  },
  frame892: {
    height: 487.41299,
    paddingTop: 31.2,
    paddingLeft: 20.8,
    paddingBottom: 31.2,
    paddingRight: 20.8,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
    overflow: "hidden", // Ensures that content respects border radius
    borderRadius: 26,
    backgroundColor: "rgba(196, 196, 196, 0.10196078568696976)",
  },
  frame13: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 1.387,
    columnGap: 1.387,
    alignSelf: "stretch",
  },
  frame72: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5.547,
    columnGap: 5.547,
  },
  group79: {
    height: 18,
    flexDirection:'row',
    justifyContent:'center',
    gap:4,
  },
  $35: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "500",
  },
  group78: {
    width: 41.231,
    height: 18,
    flexDirection: "row",
    gap: 2,
  },
  frame74: {
    paddingTop: 0.934,
    paddingLeft: 0.934,
    paddingBottom: 0.934,
    paddingRight: 0.934,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 4.671,
    columnGap: 4.671,
  },
  painAuChocolat: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 33.455,
    fontStyle: "normal",
    fontWeight: "600",
  },
});

export default home;
