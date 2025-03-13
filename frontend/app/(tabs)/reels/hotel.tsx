import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Pressable,
  ImageBackground,

} from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { Redirect, useRouter, Link } from "expo-router";
import { useHotelBooking } from "../../../script/booking";
import React , { useState,useEffect } from 'react';
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; 


export default function hotel() {
  const router = useRouter();
  const { bookHotel } = useHotelBooking();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBooking = async () => {
   const hotelAddress = '0xb29e1ddDfc73E00dEE3EaA7EA102990ADca78b39'

    setIsLoading(true);
    try {
        const txHash = await bookHotel(hotelAddress);
        Alert.alert(
            "Success",
            `Booking completed!\nTransaction: ${txHash}`,
        );
    } catch (error) {
        Alert.alert("Error", error.message || "Failed to book hotel");
    } finally {
        setIsLoading(false);
    }
};




//

  const [selected, setSelected] = useState(1);


  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);



  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
      style={{ backgroundColor: "rgba(14, 14, 14, 1)" }}
    >
      <View style={styles.root}>
        <View style={styles.frame114} testID="1293:183">
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <Path
                d="M7.7068 1.38672L1.4668 7.62672L7.7068 13.8667"
                stroke="white"
                strokeWidth={2.08}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

     
     <Image
          source={require("../../../assets/images/_dinner1.png")}
          style={styles.rectangle9}
        />
   
        

        
        <View style={styles.frame98} testID="1256:2218">
          <View style={styles.frame22} testID="1256:2219">
            {/* <Vector/> */}
          </View>
          <View style={styles.frame97} testID="1256:2221">
            <View style={styles.frame96} testID="1256:2222">
              <View style={styles.group21} testID="1256:2223">
                <View style={styles.frame95} testID="1256:2224">
                  <View style={styles.frame94} testID="1256:2225">
                    <Text style={styles.sunDriedMeat} testID="1256:2226">
                      {`Sun Dried Meat`}
                    </Text>
                    <View style={styles.frame2} testID="1256:2227">
                      <View style={styles.group80} testID="1256:2228">
                        {/* <WeuiLocationFilled/> */}
                        <Text style={styles.roorkee} testID="1256:2231">
                          {`Roorkee`}
                        </Text>
                      </View>
                      <View style={styles.dot} />
                      <View style={styles.group78} testID="1256:2233">
                        <Text style={styles.$35} testID="1256:2234">
                          {`3.5`}
                        </Text>
                        <View style={styles.frame74} testID="1256:2235">
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
                  </View>
                  <View style={styles.frame3} testID="1256:2237">
                    <Pressable style={[styles.frame25, selected === 1 && styles._frame25]} onPress={() => setSelected(1)}>
                      <Text  style={[styles.discription, selected === 1 && styles._discription]}  testID="1256:2239">
                        {`Discription`}
                      </Text>
                    </Pressable>
                    <Pressable style={[styles.frame25, selected === 0 && styles._frame25]} onPress={() => setSelected(0)}>
                      <Text  style={[styles.discription, selected === 0 && styles._discription]}  testID="1256:2239">
                        {`Post`}
                      </Text>
                    </Pressable>
                   
                  </View>
                </View>
              </View>
              {selected==1 ?(
               <Text
               style={
                 styles.steakTartareBecamePopularInThe19ThCenturyInNewYorkItWasOriginallyMadeWithHamburgSteakBecauseOfTheRelativelyInexpensiveCostOfTheMeatOverTimeItBecameAClassicFrenchDishWithTheIngredientsChangeingIntoTheFlavorsWeAreFamiliarWithToday
               }
               testID="1256:2242"
             >
               {`Steak tartare became popular in the 19th century in New York. It was originally made with hamburg steak because of the relatively inexpensive cost of the meat. Over time it became a classic French dish, with the ingredients changeing into the flavors we are familiar with today.
`               }
             </Text>

              ):(
                <View style={styles.frame29} testID="1381:608">
                  <TouchableOpacity>
                  <ImageBackground source={require("../../../assets/images/food7.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile2.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@kavya_shah`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0xa1b2c...1234`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                </TouchableOpacity>
                <TouchableOpacity>
                <ImageBackground source={require("../../../assets/images/food2.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile4.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@john_mark03`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0x5d6e7...6789`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                </TouchableOpacity>
              
                <TouchableOpacity>
                <ImageBackground source={require("../../../assets/images/food4.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile6.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@tiya_ken95`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0x7b8c9...7890`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                </TouchableOpacity>
             
                <TouchableOpacity>
                <ImageBackground source={require("../../../assets/images/food5.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile3.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@sem_go67`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0x3c4d5...4566`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                </TouchableOpacity>
                <TouchableOpacity>
                <ImageBackground source={require("../../../assets/images/food6.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile8.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@tony_stark04`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0x9f8e7d...ef02`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                </TouchableOpacity>
            
                <TouchableOpacity>
                <ImageBackground source={require("../../../assets/images/food3.png")} style={styles.frame32} testID="1381:609">
                  <View style={styles.group19} testID="1381:618">
                    <View style={styles.frame44} testID="1381:619">
                      <ImageBackground  source={require("../../../assets/images/profile1.png")}  style={styles.group81}  width={34.46} height={34.46}/>
                      <Text style={styles.kai06} testID="1381:622">
                        {`@david_hi`}
                      </Text>
                      <Text style={styles.$0XAbdf56} testID="1381:623">
                        {`0x1a2b3c...ef01`}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
                </TouchableOpacity>
        
               
                
              </View>

              )
            }
            </View>
            <TouchableOpacity
              style={styles.frame21}
              testID="1256:2243"
              onPress={handleBooking}
            >
              <Text style={styles.bookNow} testID="1256:2244">
                {`Book Now`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  back: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
  },

  dot: {
    width: 5.52,
    height: 5.52,
    borderRadius: 3.52,
    backgroundColor: "#ffffff",
    opacity: 0.4,
  },
  root: {
    width: 390,

    minHeight: 857.49701,
    flexDirection: "column",
    alignItems: "flex-start",

    backgroundColor: "rgba(14, 14, 14, 1)",
  },
  rectangle9: {
    marginBottom: -372.06,
    width: 390,
    height: 451.54199,
  },
  frame98: {
    paddingTop: 0,
    paddingLeft: 21.1,
    paddingBottom: 21.1,
    paddingRight: 21.1,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 298.918,
    columnGap: 298.918,
    alignSelf: "stretch",
  },
  frame22: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 9.847,
    paddingBottom: 0,
    paddingRight: 9.847,
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    alignSelf: "stretch",
  },
  sunDriedMeat: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 43.607,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 45.014,
  },
  roorkee: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 14.793,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 15.27,
  },
  frame97: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 26.375,
    columnGap: 26.375,
    alignSelf: "stretch",
  },
  frame96: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 26.375,
    columnGap: 26.375,
    alignSelf: "stretch",
  },
  group21: {
    height: 143.47701,
    alignSelf: "stretch",
  },
  frame95: {
    width: 347.79999,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 26.375,
    columnGap: 26.375,
  },
  frame94: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 7.385,
    columnGap: 7.385,
    alignSelf: "stretch",
  },
  frame2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5.627,
    columnGap: 5.627,
  },
  group80: {
    height: 16,
  },
  $35: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Inter",
    fontSize: 14.77,
    fontStyle: "normal",
    fontWeight: "400",
  },
  group78: {
    width: 41.826,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3.517,
  },
  frame74: {
    paddingTop: 0.948,
    paddingLeft: 0.948,
    paddingBottom: 0.948,
    paddingRight: 0.948,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 4.738,
    columnGap: 4.738,
  },
  discription: {
    color: "#D3D3D3",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.793,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.27,
  },
  _discription: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.793,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.27,
  },
  frame3: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 7.385,
    columnGap: 7.385,
    alignSelf: "stretch",
  },
  frame25: {
    flexDirection: "row",
    height: 45.717,
    paddingTop: 15.122,
    paddingLeft: 22.507,
    paddingBottom: 15.122,
    paddingRight: 22.507,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    borderBottomLeftRadius: 43.959,
    borderBottomRightRadius: 43.959,
    borderTopLeftRadius: 43.959,
    borderTopRightRadius: 43.959,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  _frame25: {
    flexDirection: "row",
    height: 45.717,
    paddingTop: 15.122,
    paddingLeft: 22.507,
    paddingBottom: 15.122,
    paddingRight: 22.507,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    borderBottomLeftRadius: 43.959,
    borderBottomRightRadius: 43.959,
    borderTopLeftRadius: 43.959,
    borderTopRightRadius: 43.959,
    backgroundColor: "rgba(255, 255, 255, 1)",
   
   
  },
  post: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.793,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.27,
  },
  frame27: {
    flexDirection: "row",
    height: 45.717,
    paddingTop: 15.122,
    paddingLeft: 22.507,
    paddingBottom: 15.122,
    paddingRight: 22.507,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.517,
    columnGap: 3.517,
    borderBottomLeftRadius: 43.959,
    borderBottomRightRadius: 43.959,
    borderTopLeftRadius: 43.959,
    borderTopRightRadius: 43.959,
    backgroundColor: "rgba(217, 217, 217, 0.10196078568696976)",
  },
  steakTartareBecamePopularInThe19ThCenturyInNewYorkItWasOriginallyMadeWithHamburgSteakBecauseOfTheRelativelyInexpensiveCostOfTheMeatOverTimeItBecameAClassicFrenchDishWithTheIngredientsChangeingIntoTheFlavorsWeAreFamiliarWithToday:
    {
      minHeight: 189.901,
      alignSelf: "stretch",
      color: "#fcfcfc",
      fontFamily: "Inter",
      fontSize: 14.77,
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 18.99,
    },
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
    flexDirection: "row",
    height: 61.19,
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
  },
  kai06: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14.77,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  $0XAbdf56: {
    width: 119.216,
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Inter',
    fontSize: 14.77,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  frame29: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    rowGap: 17,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    flexWrap: 'wrap',
  },
  frame32: {
    width: 165.013,
    height: 227.75999,
    paddingTop: 21.493,
    paddingLeft: 15.947,
    paddingBottom: 21.493,
    paddingRight: 15.947,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    rowGap: 3.467,
    columnGap: 3.467,
    overflow: 'hidden',
    borderBottomLeftRadius: 24.267,
    borderBottomRightRadius: 24.267,
    borderTopLeftRadius: 24.267,
    borderTopRightRadius: 24.267,
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
  group19: {
    width: 114.292,
    height: 80.31,
    flexShrink: 0,
  },
  frame44: {
    width: 114.292,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4.923,
    columnGap: 4.923,
  },
  group81: {
   height:34.46,
   width: 34.46,
   overflow: 'hidden',
   borderRadius: 20,
  },
});
