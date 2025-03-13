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


export default function booking() {


  return (
   <SafeAreaView
   style={{ backgroundColor: "#0E0E0E" }}
   >
        <View
          style={{
            flex:1,
            display: "flex",
            width: 390,
            minHeight:800,
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
                  Bookings
                </Text>
                <Text
                 style={{
                    height: 32,
                    width: "auto",
                    margin: '20',
                    alignSelf: "stretch",
                    flexShrink: 0,
                    flexBasis: "auto",
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontWeight: "500",
                    lineHeight: 31.928,
                    color: "#999999",
                
                 
                    textAlign: "center",
                  }}
                
                >
                    No Booking yet
                </Text>
               
              </View>
             
            </View>
           
          </View>
        </View>
   

   </SafeAreaView>
  
    
  );
}
