import {
  Image,
  SafeAreaView,
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { useHotelBooking } from "../../../script/claimReward";
import { useWalletStore } from "../../../components/walletStore";
import { Redirect, useRouter, Link } from "expo-router";


const profile = () => {
  const { claimInfluencerRewards, isConnected } = useHotelBooking();
  const [creditScore, setCreditScore] = useState("90"); // Simulating a stored credit score
  const { address, chainId, walletProvider } = useWalletStore();
  const [claim,setClaim] = useState(1)
  const [tx,setTx] = useState('');

  const handleClaim = async () => {
    if (!isConnected) {
      Alert.alert("Wallet Not Connected", "Please connect your wallet first.");
      open(); // Open the wallet connection modal
      return;
    }

    const score = parseInt(creditScore);

    try {
      const txHash = await claimInfluencerRewards(score);
      if (txHash) {
        Alert.alert(
          "Success",
          `Rewards claimed successfully!\nTx Hash: ${txHash}`
        );
        setTx(txHash)
        setCreditScore("0"); // Reset credit score after successful claim
        setClaim(claim + 1);
      }
    } catch (error) {
      console.error("Error claiming rewards:", error);
    }
   
  };

  //

  const [selected, setSelected] = useState(1);
  const router = useRouter();
  

  return (
    <ScrollView
      style={{ backgroundColor: "rgba(14, 14, 14, 1)" }}
      showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
    >
      <View style={styles.root}>
        <TouchableOpacity 
        style={{ height: 34.16, width: 34.16, zIndex:1, position: 'absolute'  ,left:30, top:66, justifyContent:'center',alignItems:'center' }}
        onPress={() => router.back()} 
        >
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
      <TouchableOpacity style={{ height: 34.16, width: 34.16, zIndex:1, position: 'absolute' ,right:30, top:64 }} >
      <Svg width="35" height="35" viewBox="0 0 35 35" fill="none">
  <Path d="M17.4034 11.2796C17.459 11.2797 17.459 11.2797 17.5156 11.2798C18.071 11.2816 18.6008 11.3024 19.1344 11.471C19.1861 11.4872 19.1861 11.4872 19.2388 11.5038C20.9888 12.0695 22.3587 13.2472 23.1995 14.8756C23.9225 16.3293 24.0138 18.0727 23.5096 19.6089C23.1839 20.5493 22.7088 21.3336 22.022 22.059C21.9861 22.0977 21.9502 22.1364 21.9133 22.1763C21.0416 23.0867 19.9176 23.6304 18.6968 23.8966C18.6363 23.9106 18.6363 23.9106 18.5745 23.925C16.9795 24.2755 15.3416 23.8503 13.9716 23.0216C13.6378 22.8046 13.3412 22.5515 13.0528 22.2778C12.994 22.2224 12.994 22.2224 12.9339 22.1658C12.4567 21.704 12.0947 21.2004 11.784 20.6152C11.7482 20.5482 11.7482 20.5482 11.7117 20.4798C11.6452 20.3512 11.5824 20.2216 11.5215 20.0902C11.5027 20.0499 11.4838 20.0095 11.4644 19.968C11.1396 19.2043 11.0632 18.4147 11.0621 17.5936C11.0619 17.5574 11.0617 17.5212 11.0615 17.4839C11.058 15.8919 11.6978 14.4144 12.7903 13.2649C12.8102 13.2438 12.83 13.2228 12.8505 13.2011C13.7407 12.263 14.8548 11.6563 16.1155 11.3835C16.1667 11.3714 16.1667 11.3714 16.2189 11.359C16.6108 11.2748 17.0045 11.2786 17.4034 11.2796Z" fill="#FEFEFE"/>
  <Path d="M26.2143 8.42917C26.3681 8.53987 26.4964 8.65481 26.6146 8.80312C26.6431 8.83839 26.6431 8.83839 26.6722 8.87438C26.7996 9.07278 26.8101 9.28618 26.8169 9.51682C26.8192 9.5619 26.8192 9.5619 26.8216 9.60789C26.8204 10.0654 26.524 10.4058 26.2185 10.7151C26.1726 10.7606 26.1265 10.8059 26.0803 10.8511C26.0101 10.9198 25.9411 10.9894 25.8721 11.0592C25.4518 11.4789 25.11 11.7057 24.5051 11.7074C24.1794 11.6996 23.9936 11.5997 23.7613 11.3805C23.4908 11.0944 23.3583 10.8337 23.3523 10.4329C23.3505 10.3763 23.3486 10.3196 23.3467 10.2613C23.3914 9.78281 23.7628 9.43463 24.0886 9.11773C24.1592 9.04901 24.2288 8.97939 24.2983 8.90959C24.8252 8.38588 25.4864 7.99874 26.2143 8.42917Z" fill="#FBFBFB"/>
  <Path d="M9.30326 8.25078C9.33331 8.24924 9.36336 8.24769 9.39433 8.24609C9.89319 8.24743 10.2538 8.59859 10.5851 8.93116C10.6085 8.95511 10.632 8.97906 10.6562 9.00373C10.728 9.07666 10.8008 9.14835 10.8739 9.21999C11.1713 9.51624 11.4589 9.81664 11.5062 10.2524C11.502 10.674 11.4596 10.9865 11.1685 11.3091C10.8242 11.6385 10.5438 11.7027 10.0751 11.721C9.58949 11.6696 9.22673 11.319 8.90327 10.9863C8.83564 10.9169 8.76681 10.8489 8.69774 10.781C8.37253 10.4558 8.03524 10.0959 8.03027 9.61015C8.03165 9.58026 8.03303 9.55038 8.03445 9.51959C8.03529 9.48762 8.03613 9.45565 8.037 9.42271C8.05065 9.15921 8.11224 8.96457 8.28329 8.7594C8.30653 8.73126 8.32976 8.70311 8.3537 8.67412C8.6347 8.36669 8.88642 8.26319 9.30326 8.25078Z" fill="#FBFBFB"/>
  <Path d="M10.7275 23.6589C11.061 23.8362 11.3616 24.0968 11.4767 24.4655C11.531 24.9035 11.4974 25.2964 11.2301 25.6556C11.1496 25.7487 11.066 25.8373 10.9791 25.9246C10.8924 26.0126 10.8076 26.1023 10.7225 26.1919C10.654 26.2627 10.5855 26.3336 10.5169 26.4043C10.4846 26.4383 10.4523 26.4723 10.419 26.5074C10.1313 26.7991 9.82348 27.0272 9.39994 27.0336C9.36969 27.0326 9.33943 27.0316 9.30826 27.0305C9.27606 27.0298 9.24386 27.0291 9.21068 27.0284C8.82867 27.0105 8.61392 26.867 8.35392 26.593C8.12725 26.3365 8.04486 26.083 8.04219 25.7426C8.04083 25.6854 8.03948 25.6283 8.03809 25.5694C8.07913 25.0977 8.41783 24.7759 8.73781 24.4609C8.81025 24.3893 8.88131 24.3165 8.95235 24.2435C9.43988 23.7519 10.0158 23.3784 10.7275 23.6589Z" fill="#FBFBFB"/>
  <Path d="M25.2013 23.67C25.464 23.8455 25.6892 24.0712 25.915 24.2907C25.9548 24.3289 25.9548 24.3289 25.9954 24.3678C26.0785 24.4474 26.1609 24.5275 26.2431 24.6079C26.2688 24.6327 26.2945 24.6575 26.321 24.683C26.4855 24.8462 26.5961 25.0035 26.7025 25.2095C26.7202 25.2378 26.7378 25.2662 26.756 25.2953C26.8583 25.5636 26.8306 25.9444 26.7518 26.217C26.5928 26.5563 26.3432 26.8362 25.9897 26.9741C25.5538 27.0817 25.2167 27.0345 24.8262 26.8278C24.6087 26.689 24.4318 26.5169 24.2535 26.3314C24.1921 26.2676 24.1296 26.2049 24.067 26.1423C23.6465 25.7138 23.3574 25.3608 23.3584 24.7502C23.3654 24.4766 23.4187 24.2859 23.5961 24.072C23.6184 24.0438 23.6406 24.0157 23.6635 23.9867C24.0284 23.5742 24.6973 23.4189 25.2013 23.67Z" fill="#FBFBFB"/>
  <Path d="M18.0543 26.7045C18.3701 26.9053 18.5804 27.1687 18.6955 27.5274C18.7098 27.6665 18.7109 27.8052 18.7118 27.9449C18.7124 28.0055 18.7124 28.0055 18.713 28.0674C18.7136 28.1528 18.714 28.2382 18.7142 28.3237C18.7147 28.4532 18.7168 28.5827 18.719 28.7122C18.7258 29.51 18.7258 29.51 18.4768 29.8463C18.4452 29.8941 18.4136 29.9419 18.3811 29.9912C18.0518 30.3058 17.6725 30.3872 17.2307 30.3836C17.0262 30.3672 16.892 30.3143 16.7267 30.1963C16.6807 30.1638 16.6347 30.1313 16.5872 30.0978C16.2904 29.8076 16.1512 29.4826 16.1413 29.0685C16.1409 29.0313 16.1405 28.9942 16.1401 28.9558C16.1397 28.9167 16.1392 28.8775 16.1386 28.8371C16.1378 28.7544 16.1372 28.6717 16.1369 28.5889C16.1361 28.4639 16.1333 28.339 16.1306 28.2139C16.1248 27.7109 16.1479 27.3109 16.4967 26.9161C16.569 26.8457 16.6411 26.7932 16.7267 26.7399C16.7554 26.7219 16.7841 26.704 16.8137 26.6855C17.2038 26.4787 17.6663 26.5073 18.0543 26.7045Z" fill="#FCFCFC"/>
  <Path d="M18.0319 5.02939C18.3696 5.22218 18.5892 5.4905 18.6959 5.87127C18.7354 6.13641 18.7301 6.40456 18.7253 6.67194C18.7233 6.79562 18.7235 6.91914 18.7241 7.04283C18.7225 7.5479 18.6993 7.99592 18.3392 8.38547C17.9791 8.68467 17.5752 8.75266 17.1208 8.71515C16.8071 8.63296 16.5232 8.4476 16.3548 8.16808C16.2064 7.87667 16.1507 7.64644 16.1479 7.31902C16.1475 7.28042 16.1472 7.24183 16.1468 7.20207C16.1462 7.12024 16.1457 7.03841 16.1454 6.95658C16.1449 6.87346 16.144 6.79034 16.1427 6.70723C16.1264 5.66411 16.1264 5.66411 16.527 5.23533C16.9446 4.84672 17.5191 4.78596 18.0319 5.02939Z" fill="#FCFCFC"/>
  <Path d="M6.0831 16.3484C6.14188 16.3481 6.14188 16.3481 6.20186 16.3478C6.28418 16.3477 6.36651 16.348 6.44882 16.3488C6.57366 16.3497 6.69838 16.3488 6.8232 16.3477C7.36773 16.3468 7.79535 16.3802 8.20917 16.7681C8.46233 17.0581 8.51782 17.3783 8.51406 17.753C8.48539 18.1072 8.33252 18.4142 8.06441 18.6467C7.64489 18.951 7.22446 18.9501 6.72483 18.9434C6.59891 18.942 6.47323 18.9434 6.34732 18.9451C5.84487 18.9462 5.4427 18.9153 5.04674 18.5719C4.8004 18.3237 4.68752 17.9895 4.6709 17.6459C4.68565 17.2762 4.80494 16.9343 5.07834 16.6779C5.37589 16.4295 5.70357 16.3447 6.0831 16.3484Z" fill="#FCFCFC"/>
  <Path d="M28.1154 16.3419C28.2391 16.344 28.3626 16.3437 28.4863 16.3431C28.9913 16.3447 29.4394 16.3679 29.8289 16.728C30.1165 17.0741 30.1965 17.4647 30.1586 17.9027C30.0739 18.2452 29.9094 18.5103 29.6238 18.7168C29.2241 18.9494 28.8478 18.9465 28.3954 18.9384C28.2717 18.9363 28.1482 18.9366 28.0245 18.9372C27.5194 18.9356 27.0714 18.9124 26.6818 18.5523C26.3826 18.1922 26.3147 17.7882 26.3522 17.3339C26.3905 17.1875 26.4472 17.0682 26.5272 16.9401C26.5442 16.9128 26.5612 16.8854 26.5788 16.8572C26.9591 16.3408 27.533 16.3315 28.1154 16.3419Z" fill="#FCFCFC"/>
</Svg>
      </TouchableOpacity>
      <View style={styles.frame109} testID="1270:78">
          <View style={styles.frame108} testID="1270:79">
            <ImageBackground
              source={require("../../../assets/images/cover.png")}
              style={styles.rectangle11}
              testID="1270:80"
            />
            <View style={styles.frame1082} testID="1272:165">
              <View style={styles.frame103} testID="1272:166">
                <Text style={styles.$3642K} testID="1272:167">
                  {creditScore}
                </Text>
                <Text style={styles.creadits} testID="1272:168">
                  {`Creadits`}
                </Text>
              </View>
              <View style={styles.frame112} testID="1272:169">
                <ImageBackground
                  source={require("../../../assets/images/profile.png")}
                  style={styles.frame106}
                  testID="1272:170"
                ></ImageBackground>
              </View>
              <View style={styles.frame104} testID="1272:171">
                <Text style={styles.$231} testID="1272:172">
                  {`4`}
                </Text>
                <Text style={styles.posts} testID="1272:173">
                  {`Posts`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.group33} testID="1270:91">
            <View style={styles.frame102} testID="1270:92">
              <Text style={styles.$0Xc5G4444} testID="1270:93">
                {`${address.slice(0, 10)}...${address.slice(-3)}`}
              </Text>
              <Text style={styles.kai06} testID="1270:94">
                {`@greg_hisenberg`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.frame110} testID="1270:95">
          <View style={styles.frame3} testID="1270:96">
            <Pressable
              style={[styles.frame35, selected === 1 && styles._frame35]}
              onPress={() => setSelected(1)}
              testID="1270:97"
            >
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9842 0.93335H7.61125L7.80878 1.52595L9.34462 6.13335H12.7175L11.3644 2.07408L10.9842 0.93335ZM13.8996 7.86668C13.9131 7.867 13.9265 7.867 13.9399 7.86668H19.9866V15.2334C19.9866 17.8659 17.8525 20 15.2199 20H5.68659C3.05403 20 0.919922 17.8659 0.919922 15.2334V7.86668H8.69969C8.71306 7.867 8.72651 7.867 8.73994 7.86668H13.8996ZM14.5446 6.13335L13.0088 1.52595L12.8113 0.93335H15.2199C17.8525 0.93335 19.9866 3.06746 19.9866 5.70002V6.13335H14.5446ZM5.68659 0.93335H5.78415L6.1644 2.07408L7.51748 6.13335H0.919922V5.70002C0.919922 3.06746 3.05403 0.93335 5.68659 0.93335ZM8.78362 8.89004C8.51885 8.7047 8.17299 8.68207 7.88635 8.83128C7.59972 8.98052 7.41992 9.27684 7.41992 9.60002V15.6667C7.41992 15.9899 7.59972 16.2862 7.88635 16.4354C8.17299 16.5847 8.51885 16.562 8.78362 16.3767L13.117 13.3433C13.3486 13.1812 13.4866 12.9161 13.4866 12.6334C13.4866 12.3506 13.3486 12.0855 13.117 11.9234L8.78362 8.89004Z"
                  fill={selected == 1 ? "white" : "#868686"}
                />
              </Svg>
            </Pressable>
            <Pressable
              style={[styles.frame35, selected === 2 && styles._frame35]}
              onPress={() => setSelected(2)}
              testID="1270:97"
            >
              <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <Path
                  d="M5.10827 0.933353C4.70034 0.935202 4.37021 1.30284 4.36856 1.75601L4.34655 9.18023C4.34655 9.18239 4.34655 9.18482 4.34655 9.18699C4.34655 9.80128 4.70237 10.2028 5.04226 10.4734C6.34635 11.3548 7.81457 11.6617 9.56179 11.66C11.2819 11.6617 12.7401 11.243 14.0593 10.4531C14.3978 10.1806 14.7499 9.78268 14.7499 9.16838V1.76109C14.7515 1.30319 14.4173 0.93209 14.0051 0.933353H5.10827ZM1.74317 2.66838C1.51449 2.66932 1.29544 2.76057 1.13374 2.92227C0.972045 3.08396 0.880801 3.303 0.879887 3.53166V6.99833C0.87931 7.18127 0.936639 7.3597 1.04367 7.50808C1.15069 7.65646 1.30193 7.76717 1.47572 7.82437L3.47819 8.4896V6.66486L2.61491 6.37879V4.40171H3.47819V2.66838H1.74317ZM15.6149 2.66838V4.40171H16.4782V6.37879L15.6149 6.66486V8.4896L17.6174 7.82437C17.7912 7.76717 17.9424 7.65646 18.0494 7.50808C18.1565 7.3597 18.2138 7.18127 18.2132 6.99833V3.53166C18.2123 3.303 18.1211 3.08396 17.9594 2.92227C17.7977 2.76057 17.5786 2.66931 17.3499 2.66838H15.6149ZM12.1482 12.2322C11.5976 12.3388 11.0169 12.4167 10.4149 12.4539V13.3155H8.67989V12.4539C8.07609 12.4169 7.49631 12.3402 6.94655 12.2356V13.3155H6.09512C5.75418 13.3148 5.44281 13.4939 5.29278 13.7776L3.56791 17.0835C3.28473 17.6313 3.7148 18.2658 4.37025 18.2667H14.7262C15.3817 18.2657 15.8118 17.6313 15.5286 17.0835L13.7969 13.7776C13.6469 13.4939 13.3355 13.3148 12.9946 13.3155H12.1482V12.2322Z"
                  fill="#808080"
                  fill={selected == 2 ? "white" : "#868686"}
                />
              </Svg>
            </Pressable>
          </View>

          {selected == 1 ? (
            <View style={styles.frame29} testID="1270:104">
              <TouchableOpacity>
                <ImageBackground
                  source={require("../../../assets/images/food7.png")}
                  style={styles.frame32}
                  testID="1270:105"
                >
                  <Text style={styles.garlicBread} testID="1270:106">
                    {`Olive Garden`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <ImageBackground
                  source={require("../../../assets/images/food5.png")}
                  style={styles.frame32}
                  testID="1270:105"
                >
                  <Text style={styles.garlicBread} testID="1270:106">
                    {`Urban Tandoor`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <ImageBackground
                  source={require("../../../assets/images/food3.png")}
                  style={styles.frame32}
                  testID="1270:105"
                >
                  <Text style={styles.garlicBread} testID="1270:106">
                    {`Aroma Bites`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <ImageBackground
                  source={require("../../../assets/images/food4.png")}
                  style={styles.frame32}
                  testID="1270:105"
                >
                  <Text style={styles.garlicBread} testID="1270:106">
                    {`Spice Avenue`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {claim == 1 ? (
                <TouchableOpacity onPress={handleClaim} style={styles._frame129} testID="1348:220">
                <View style={styles.frame132} testID="1348:221">
                  <View style={styles.frame120} testID="1348:222">
                    <View style={styles._frame117} testID="1348:223">
                      <Text style={styles.posted} testID="1348:224">
                        {`Claim`}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frame118} testID="1348:229">
                </View>
              </TouchableOpacity>
              ):(
                <View style={styles.__frame129} testID="1348:220">
                <View style={styles.frame132} testID="1348:221">
                  <View style={styles.frame120} testID="1348:222">
                    <View style={styles.frame117} testID="1348:223">
                      <Text style={styles.posted} testID="1348:224">
                        {'Claimed'}
                      </Text>
                      <Text
                        style={
                          styles.stephanieMarinkovicPostedANewRecipeWhiskeySour
                        }
                        testID="1348:225"
                      >
                        hash:{tx}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frame118} testID="1348:229">
                  <Text style={styles.now} testID="1348:230">
                    {`now`}
                  </Text>
                </View>
              </View>
              
              )}
              <View style={styles.frame129} testID="1348:220">
                <View style={styles.frame132} testID="1348:221">
                  <View style={styles.frame120} testID="1348:222">
                    <View style={styles.frame117} testID="1348:223">
                      <Text style={styles.posted} testID="1348:224">
                      {'Claimed'}
                      </Text>
                      <Text
                        style={
                          styles.stephanieMarinkovicPostedANewRecipeWhiskeySour
                        }
                        testID="1348:225"
                      >
                        {`hash:0x52e253cea274d90eb9ac5af6ecdf64c45010e373def8ed56095f8e87372448fb`}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frame118} testID="1348:229">
                  <Text style={styles.now} testID="1348:230">
                    {`10d`}
                  </Text>
                </View>
              </View>
              <View style={styles.frame129} testID="1348:220">
                <View style={styles.frame132} testID="1348:221">
                  <View style={styles.frame120} testID="1348:222">
                    <View style={styles.frame117} testID="1348:223">
                      <Text style={styles.posted} testID="1348:224">
                      {'Claimed'}
                      </Text>
                      <Text
                        style={
                          styles.stephanieMarinkovicPostedANewRecipeWhiskeySour
                        }
                        testID="1348:225"
                      >
                        {`hash:0x4a293a86cba66c1c1971c350af5c4a0c31fa5eda730ec70660c5d4c5343d1271`}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frame118} testID="1348:229">
                  <Text style={styles.now} testID="1348:230">
                    {`15d`}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 390,
    minHeight: 845.29999,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 36.053,
    columnGap: 36.053,
    backgroundColor: "#0E0E0E",
  },
  rectangle11: {
    height: 272.133,
    alignSelf: "stretch",
    backgroundColor: "rgba(52, 52, 52, 1)",
  },
  $3642K: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 13.408,
    fontStyle: "normal",
    fontWeight: "600",
  },
  creadits: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 12.48,
    fontStyle: "normal",
    fontWeight: "500",
  },
  frame109: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 10.053,
    columnGap: 10.053,
    alignSelf: "stretch",
  },
  frame108: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: -56,
    columnGap: -56,
    alignSelf: "stretch",
  },
  frame1082: {
    marginTop: -56,
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 38.827,
    paddingBottom: 0,
    paddingRight: 38.827,
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  frame103: {
    width: 75.92,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    rowGap: 5.2,
    columnGap: 5.2,
    alignSelf: "stretch",
  },
  frame112: {
    flexDirection: "row",
    paddingTop: 7,
    paddingLeft: 7,
    paddingBottom: 7,
    paddingRight: 7,
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 77,
    borderBottomRightRadius: 77,
    borderTopLeftRadius: 77,
    borderTopRightRadius: 77,
    backgroundColor: "#0E0E0E",
  },
  frame106: {
    flexDirection: "row",
    width: 98.107,
    height: 98.107,
    alignItems: "center",
    rowGap: 3.467,
    columnGap: 3.467,
    overflow: "hidden",
    borderRadius: 77,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  $231: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 13.408,
    fontStyle: "normal",
    fontWeight: "600",
  },
  posts: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 12.48,
    fontStyle: "normal",
    fontWeight: "500",
  },
  frame104: {
    width: 75.92,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    rowGap: 5.2,
    columnGap: 5.2,
  },
  $0Xc5G4444: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 0.7019608020782471)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 12.48,
    fontStyle: "normal",
    fontWeight: "500",
  },
  kai06: {
    alignSelf: "stretch",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 21.493,
    fontStyle: "normal",
    fontWeight: "500",
  },
  group33: {
    height: 47.587,
    alignSelf: "stretch",
  },
  frame102: {
    width: 390,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 6.587,
    columnGap: 6.587,
  },
  frame110: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: 7,
    columnGap: 7,
    alignSelf: "stretch",
  },
  frame3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    alignSelf: "stretch",
  },
  frame35: {
    width: 111.627,
    height: 33.986,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 14.907,
    columnGap: 14.907,
  },
  _frame35: {
    width: 111.627,
    height: 33.986,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 14.907,
    columnGap: 14.907,
    borderBottomColor: "rgba(255, 255, 255, 1)",
    borderBottomWidth: 2.08,
  },
  frame36: {
    width: 111.627,
    height: 33.987,
    flexDirection: "column",
    alignItems: "center",
    rowGap: 14.907,
    columnGap: 14.907,
  },
  garlicBread: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame29: {
    flexDirection: "row",
    height: 506.51999,
    paddingTop: 0,
    paddingLeft: 20.8,
    paddingBottom: 0,
    paddingRight: 20.8,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    rowGap: 17,
    alignSelf: "stretch",
    flexWrap: "wrap",
  },
  frame32: {
    width: 165.013,
    height: 227.75999,
    paddingTop: 21.493,
    paddingLeft: 15.947,
    paddingBottom: 21.493,
    paddingRight: 15.947,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    overflow: "hidden",
    borderBottomLeftRadius: 24.267,
    borderBottomRightRadius: 24.267,
    borderTopLeftRadius: 24.267,
    borderTopRightRadius: 24.267,
    backgroundColor: "rgba(49, 49, 49, 1)",
  },
  garlicBread2: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame33: {
    width: 165.013,
    height: 227.75999,
    paddingTop: 21.493,
    paddingLeft: 15.947,
    paddingBottom: 21.493,
    paddingRight: 15.947,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 24.267,
    borderBottomRightRadius: 24.267,
    borderTopLeftRadius: 24.267,
    borderTopRightRadius: 24.267,
    backgroundColor: "rgba(49, 49, 49, 1)",
  },
  garlicBread3: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame34: {
    width: 165.013,
    height: 227.75999,
    paddingTop: 21.493,
    paddingLeft: 15.947,
    paddingBottom: 21.493,
    paddingRight: 15.947,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 24.267,
    borderBottomRightRadius: 24.267,
    borderTopLeftRadius: 24.267,
    borderTopRightRadius: 24.267,
    backgroundColor: "rgba(49, 49, 49, 1)",
  },
  garlicBread4: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14.56,
    fontStyle: "normal",
    fontWeight: "600",
  },
  frame352: {
    width: 165.013,
    height: 227.75999,
    paddingTop: 21.493,
    paddingLeft: 15.947,
    paddingBottom: 21.493,
    paddingRight: 15.947,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    rowGap: 3.467,
    columnGap: 3.467,
    borderBottomLeftRadius: 24.267,
    borderBottomRightRadius: 24.267,
    borderTopLeftRadius: 24.267,
    borderTopRightRadius: 24.267,
    backgroundColor: "rgba(49, 49, 49, 1)",
  },

  //
 __frame129: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
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
    opacity: 0.4,
  },
  _frame129: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
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
  frame129: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 18,
    marginRight: 18,
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
    opacity: 0.4,
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
  _frame117: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop:2,
    paddingBottom:2,
    rowGap: 6.16,
    columnGap: 4.16,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
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
  frame118: {
    gap: 6,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.72,
    letterSpacing: 0.208,
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
});

export default profile;
