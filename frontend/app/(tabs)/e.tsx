import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Import Video from expo-av
import axios from "axios";
import { BookingContext } from "./context/BookingContext";
import { useThemeContext } from "../context/ThemeContext";



const notification = () => {

  const { bookings } = useContext(BookingContext);
  const { resetBookings } = useContext(BookingContext);
  const { toggleTheme, isDarkMode, theme } = useThemeContext();
  
  

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
    >
      <View style={[styles.root,{backgroundColor:theme.background}]}>
        <View style={styles.frame22} testID="1269:3">
          <Svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <Path
              d="M7.57319 1.47705L1.24316 7.80708L7.57319 14.1371"
              stroke={theme.text_primary}
              strokeWidth="2.11001"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <View style={styles.frame101} testID="1269:5">
          <Text style={[styles.newPost,{color:theme.text_primary}]} testID="1269:6">
            {`Notification`}
          </Text>
        </View>

        <View style={styles.frame102}>
          {/* notifiacrions */}
          {bookings.length === 0 ? (
            <></>
          ) : (
            [...bookings].reverse().map((data) => (
              <View style={styles.frame129} testID="1348:220">
              <View style={styles.frame132} testID="1348:221">
                <View style={styles.frame120} testID="1348:222">
                  <View style={styles.frame117} testID="1348:223">
                    <Text style={styles.posted} testID="1348:224">
                      {`Posted!!!`}
                    </Text>
                    <Text
                      style={
                        styles.stephanieMarinkovicPostedANewRecipeWhiskeySour
                      }
                      testID="1348:225"
                    >
                      {data.review}
                    </Text>
                  </View>
                </View>
                <View style={styles.frame121} testID="1348:226">
                  <View style={styles.frame1172} testID="1348:227">
                    <Text
                      style={
                        styles.ipfsQmZ4TDuvesekSs4QM5ZbKpXiZGun7S2CYtEzrb3DyXkjGx
                      }
                      testID="1348:228"
                    >
                      IPfS:{data.ipfsHash}
                    </Text>
                  </View>
                </View>
              </View>
                <Text style={styles.now} testID="1348:230">
                  {`now`}
                </Text>
            </View>
            ))
          )}

          <View style={styles.frame130} testID="1348:219">
            <View style={[styles.frame129,{backgroundColor:theme.primary}]} testID="1348:220">
              <View style={styles.frame132} testID="1348:221">
                <View style={styles.frame120} testID="1348:222">
                  <View style={styles.frame117} testID="1348:223">
                    <Text style={[styles.posted,{color:theme.text_primary}]} testID="1348:224">
                      {`Posted!!!`}
                    </Text>
                    <Text
                      style={[
                        styles.stephanieMarinkovicPostedANewRecipeWhiskeySour,
                      {color:theme.text_secondary}
                      ]
                      }
                      testID="1348:225"
                    >
                      {`Cozy ambiance, friendly staff, and delicious pasta! `}
                    </Text>
                  </View>
                </View>
                <View style={styles.frame121} testID="1348:226">
                  <View style={styles.frame1172} testID="1348:227">
                    <Text
                      style={[
                        styles.ipfsQmZ4TDuvesekSs4QM5ZbKpXiZGun7S2CYtEzrb3DyXkjGx
                        ,{color:theme.text_secondary}
                      ]}
                      testID="1348:228"
                    >
                      {`IPFS:QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx`}
                    </Text>
                  </View>
                </View>
              </View>
            
                <Text style={[styles.now,{color:theme.text_secondary}]} testID="1348:230">
                  {`1d`}
                </Text>
                
            </View>
            <View style={[styles.frame129,{backgroundColor:theme.primary}]} testID="1348:220">
              <View style={styles.frame132} testID="1348:221">
                <View style={styles.frame120} testID="1348:222">
                  <View style={styles.frame117} testID="1348:223">
                    <Text style={[styles.posted,{color:theme.text_primary}]} testID="1348:224">
                      {`Booked!!!`}
                    </Text>
                    <Text
                      style={[
                        styles.ipfsQmZ4TDuvesekSs4QM5ZbKpXiZGun7S2CYtEzrb3DyXkjGx,
                      {color:theme.text_secondary}
                      ]
                      }
                      testID="1348:225"
                    >
                      {`hash:0x4a293a86cba66c1c1971c350af5c4a0c31fa5eda730ec70660c5d4c5343d1271`}
                    </Text>
                  </View>
                </View>
              
              </View>
             
                <Text style={[styles.now,{color:theme.text_secondary}]} testID="1348:230">
                  {`5d`}
                </Text>
                
            
            </View>
           
         
          </View>
        
        </View>
        <TouchableOpacity style={[styles.frame21,{backgroundColor:theme.text_primary}]}  onPress={resetBookings} >
          <Text style={[styles.bookNow,{color:theme.text_tertiary}]} testID="1256:2244">
            {`Clear`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookNow: {
    
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame21: {
    zIndex: 1,
    position: "absolute",
    top: 660,
    
   

   
    flexDirection: "row",
    height: 61.19,
    width:354,
  
    margin: 18,
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
    paddingTop: 79.477,
    paddingLeft: 0,
    paddingBottom: 100,
    paddingRight: 0,
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-start",
    rowGap: 33.408,
    columnGap: 33.408,
    backgroundColor: "rgba(14, 14, 14, 1)",
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
  tag: {
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
    paddingTop: 0,
    paddingLeft: 21.1,
    paddingBottom: 0,
    paddingRight: 21.1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    rowGap: 3.517,
    columnGap: 3.517,
    alignSelf: "stretch",
  },
  frame115: {
    width: 97.06,
    height: 50.64,
    paddingTop: 15,
    paddingLeft: 17,
    paddingBottom: 15,
    paddingRight: 17,
    flexDirection: "column",
    alignItems: "flex-start",
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
    alignItems: "center",
    rowGap: 4,
    columnGap: 4,
  },

  posted: {
    alignSelf: "stretch",
    color: "rgb(255, 255, 255)",
    fontFamily: "Inter",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    letterSpacing: 0.139,
  },
  stephanieMarinkovicPostedANewRecipeWhiskeySour: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Inter",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 18.72,
    letterSpacing: 0.208,
  },
  frame102: {
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 0,
    paddingRight: 20,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 9.013,
    columnGap: 9.013,
    alignSelf: "stretch",
  },
  frame130: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 9.013,
    columnGap: 9.013,
    alignSelf: "stretch",
  },
  frame129: {
    flexDirection: "row",
    paddingTop: 10.053,
    paddingLeft: 10.747,
    paddingBottom: 10.053,
    paddingRight: 10.747,
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderBottomLeftRadius: 12.133,
    borderBottomRightRadius: 12.133,
    borderTopLeftRadius: 12.133,
    borderTopRightRadius: 12.133,
    backgroundColor: "rgba(24, 24, 24, 1)",
  },
  frame132: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 15,
    columnGap: 15,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  frame120: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frame117: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 6.16,
    columnGap: 4.16,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  ipfsQmZ4TDuvesekSs4QM5ZbKpXiZGun7S2CYtEzrb3DyXkjGx: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.72,
    letterSpacing: 0.177,
  },
  frame121: {
    flexDirection: "row",
   
    alignItems: "center",
    rowGap: 40.56,
    columnGap: 40.56,
  },
  frame1172: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 4.16,
    columnGap: 4.16,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  now: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.501960813999176)",
    textAlign: "right",
    fontFamily: "Inter",
    fontSize: 13.48,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 15.98,
    letterSpacing: 0.187,
  },
 
  frame131: {
    flexDirection: "row",
    width: 40.36,
    height: 40.707,
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 4.16,
    borderBottomRightRadius: 4.16,
    borderTopLeftRadius: 4.16,
    borderTopRightRadius: 4.16,
    backgroundColor: "rgba(43, 43, 43, 1)",
  },
  booked: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 13.867,
    fontStyle: "normal",
    fontWeight: "700",
    letterSpacing: 0.139,
  },
  hash0X4A293A86Cba66C1C1971C350Af5C4A0C31Fa5Eda730Ec70660C5D4C5343D1271: {
    width: 243,
    color: "rgba(255, 255, 255, 0.800000011920929)",
    fontFamily: "Inter",
    fontSize: 11.787,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.72,
    letterSpacing: 0.177,
  },
  frame133: {
    flexDirection: "row",
    paddingTop: 10.053,
    paddingLeft: 10.747,
    paddingBottom: 10.053,
    paddingRight: 10.747,
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderBottomLeftRadius: 12.133,
    borderBottomRightRadius: 12.133,
    borderTopLeftRadius: 12.133,
    borderTopRightRadius: 12.133,
    backgroundColor: "rgba(24, 24, 24, 1)",
  },
  frame1322: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 15,
    columnGap: 15,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  frame1202: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frame1173: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 4.16,
    columnGap: 4.16,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  now2: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.501960813999176)",
    textAlign: "right",
    fontFamily: "Inter",
    fontSize: 12.48,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 15.98,
    letterSpacing: 0.187,
  },
  frame1182: {
    width: 35.36,
    height: 58.987,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  frame1312: {
    flexDirection: "row",
    width: 35.36,
    height: 35.707,
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 4.16,
    borderBottomRightRadius: 4.16,
    borderTopLeftRadius: 4.16,
    borderTopRightRadius: 4.16,
    backgroundColor: "rgba(43, 43, 43, 1)",
  },
});

export default notification;
