import {
  Image,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import "@walletconnect/react-native-compat";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit-ethers-react-native";
import { useWalletStore } from "../components/walletStore";
import react, { useState } from "react";
import { useRouter , useNavigationContainerRef } from "expo-router";


const Onboarding = () => {
  const { open } = useAppKit();
  const { address, chainId, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider();
  const { setWalletProvider, setWalletInfo } = useWalletStore();

  // Store wallet provider globally
  useEffect(() => {
    if (walletProvider) {
      setWalletProvider(walletProvider);
    }
  }, [walletProvider]);

  // Store wallet connection info globally
  useEffect(() => {
    setWalletInfo(address ?? null, chainId ?? null, isConnected);
  }, [address, chainId, isConnected]);

  const handleConnect = async () => {
    await open(); // Open wallet connection modal
  };


  //selecter

  const [selected, setSelected] = useState(null);

  // redirecr

  const router = useRouter();

useEffect(() => {
 
  
  if (selected === 1 && isConnected) {
    console.log('home1')
    router.push("/home");
    return;
  }
  if (selected === 2 && isConnected) {
    console.log('Hotel')
    router.push("/(hotel)");
    return;
  }
  if (isConnected) {
    console.log('home')
    router.push("/home");
    return;
  }
}, [isConnected]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../assets/images/onboard.png")}
        style={styles.rectangle9}
      >
        <View style={styles.onboarding} testID="1260:2286">
          <View style={styles.frame92} testID="1260:2287">
            <View style={styles.frame43} testID="1260:2288">
              <View style={styles.group48} testID="1260:2289">
                <View style={styles.frame91} testID="1260:2290">
                  <Text style={styles.joinUsNow} testID="1260:2291">
                    {`Join us Now`}
                  </Text>
                  <Text
                    style={styles.decentralizedTrustVerifiedReviews}
                    testID="1260:2292"
                  >
                    {` Decentralized Trust, 
  Verified Reviews.`}
                  </Text>
                  <Text
                    style={styles.beAPartOfTheTransparentReviewRevolution}
                    testID="1260:2293"
                  >
                    {`"Be a Part of the Transparent Review Revolution!"`}
                  </Text>
                </View>
              </View>
              <View style={styles.frame42} testID="1260:2294">
                <View style={styles.frame80} testID="1260:2295">
                  <Pressable
                    style={[styles.frame52, selected === 1 && styles._frame52]}
                    onPress={() => setSelected(1)}
                  >
                    <Text
                      style={[styles.user, selected === 1 && styles._user]}
                      testID="1260:2299"
                    >
                      {`user`}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.frame50, selected === 2 && styles._frame50]}
                    onPress={() => setSelected(2)}
                  >
                    <Text
                      style={[styles.user, selected === 2 && styles._user]}
                      testID="1260:2299"
                    >
                      {`Restaurant`}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.frame90} testID="1260:2300">
              <TouchableOpacity
                onPress={handleConnect}
                style={[
                  styles.frame10,
                  selected ? styles.activeButton : styles.disabledButton,
                ]}
                disabled={!selected}
              >
                <Text style={styles.connectWallet}>{}Open Connect Modal</Text>
              </TouchableOpacity>

              <Text style={styles.byMetamask} testID="1260:2303">
                {`By Metamask`}
              </Text>
              {/* <Link  href="/(home)">Home</Link> */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle9: {},
  root: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  joinUsNow: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 29.834,
    fontStyle: "normal",
    fontWeight: "600",
  },
  decentralizedTrustVerifiedReviews: {
    height: 44.373,
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 18.375,
    fontStyle: "normal",
    fontWeight: "400",
  },
  beAPartOfTheTransparentReviewRevolution: {
    height: 45.067,
    alignSelf: "stretch",
    color: "#757575",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 18.375,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22.533,
    letterSpacing: 0.184,
  },
  onboarding: {
    flexDirection: "row",
    width: 390,
    minHeight: 845.302,
    paddingTop: 32.587,
    paddingLeft: 32.24,
    paddingBottom: 32.587,
    paddingRight: 32.24,
    justifyContent: "center",
    alignItems: "flex-end",
    rowGap: 3.467,
    columnGap: 3.467,
  },
  frame92: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 97.413,
    columnGap: 97.413,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  frame43: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: 91.173,
    columnGap: 91.173,
    alignSelf: "stretch",
  },
  group48: {
    height: 174.66701,
    alignSelf: "stretch",
  },
  frame91: {
    width: 325.51999,
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 24.613,
    columnGap: 24.613,
  },
  user: {
    width: 157.38699,
    height: 18.875,
    flexShrink: 0,
    color: "rgba(255, 255, 255, 0.4000000059604645)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 17.333,
    fontStyle: "normal",
    fontWeight: "600",
  },
  _user: {
    width: 157.38699,
    height: 18.875,
    flexShrink: 0,
    color: "rgba(226, 226, 226, 0.9019607901573181)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 17.333,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame42: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 11.44,
    columnGap: 11.44,
    alignSelf: "stretch",
  },
  frame80: {
    flexDirection: "row",
    alignItems: "flex-start",
    rowGap: 10.053,
    columnGap: 10.053,
  },
  frame52: {
    flexDirection: "row",
    width: 157.38699,
    height: 74.264,
    paddingTop: 27.733,
    paddingLeft: 0,
    paddingBottom: 27.733,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 21.493,
    borderBottomRightRadius: 21.493,
    borderTopLeftRadius: 21.493,
    borderTopRightRadius: 21.493,
    borderWidth: 1.387,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.4000000059604645)",
  },
  _frame52: {
    flexDirection: "row",
    width: 157.38699,
    height: 74.264,
    paddingTop: 27.733,
    paddingLeft: 0,
    paddingBottom: 27.733,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 21.493,
    borderBottomRightRadius: 21.493,
    borderTopLeftRadius: 21.493,
    borderTopRightRadius: 21.493,
    borderWidth: 1.387,
    borderStyle: "solid",
    borderColor: "rgba(226, 226, 226, 0.9019607901573181)",
  },
  restaurant: {
    width: 157.38699,
    height: 18.875,
    flexShrink: 0,
    color: "rgba(255, 255, 255, 0.4000000059604645)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 17.333,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame50: {
    flexDirection: "row",
    width: 157.38699,
    height: 74.264,
    paddingTop: 27.733,
    paddingLeft: 0,
    paddingBottom: 27.733,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 21.493,
    borderBottomRightRadius: 21.493,
    borderTopLeftRadius: 21.493,
    borderTopRightRadius: 21.493,
    borderWidth: 1.387,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.4000000059604645)",
  },
  _frame50: {
    flexDirection: "row",
    width: 157.38699,
    height: 74.264,
    paddingTop: 27.733,
    paddingLeft: 0,
    paddingBottom: 27.733,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 21.493,
    borderBottomRightRadius: 21.493,
    borderTopLeftRadius: 21.493,
    borderTopRightRadius: 21.493,
    borderWidth: 1.387,
    borderStyle: "solid",
    borderColor: "rgba(226, 226, 226, 0.9019607901573181)",
  },
  connectWallet: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame90: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 13.52,
    columnGap: 13.52,
    alignSelf: "stretch",
  },
  frame10: {
    flexDirection: "row",
    height: 60.32,
    paddingTop: 21.147,
    paddingLeft: 0,
    paddingBottom: 21.147,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
    borderBottomLeftRadius: 62.747,
    borderBottomRightRadius: 62.747,
    borderTopLeftRadius: 62.747,
    borderTopRightRadius: 62.747,
  },
  activeButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  disabledButton: {
    backgroundColor: "#6E6E6E",
  },
  byMetamask: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.4000000059604645)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 11.093,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22.533,
    letterSpacing: 0.111,
  },
});

export default Onboarding;
