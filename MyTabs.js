import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useRef } from "react";
import { Image } from "react-native";
import NavHomeSel from "./assets/nav_home.png";
import NavTrafficSel from "./assets/nav_traffic.png";
import NavTourSel from "./assets/nav_tour.png";
import NavPlannerSel from "./assets/nav_planner.png";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
const HOME_URL = "http://plan4land.store";
const TRAFFIC_URL = "http://plan4land.store/traffic";
const TOUR_URL = "http://plan4land.store/tourlist";
const PLANNING_URL = "http://plan4land.store/planninglist";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="메인"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        activeTintColor: "red",
      }}
    >
      <Tab.Screen
        name="메인"
        component={HomeMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={NavHomeSel}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarActiveTintColor: "#18617e",
        }}
      />
      <Tab.Screen
        name="교통"
        component={Traffic}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={NavTrafficSel}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarActiveTintColor: "#18617e",
        }}
      />
      <Tab.Screen
        name="관광지"
        component={Tour}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={NavTourSel}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarActiveTintColor: "#18617e",
        }}
      />
      <Tab.Screen
        name="플래닝"
        component={Planning}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={NavPlannerSel}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
          tabBarActiveTintColor: "#18617e",
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      webViewRef.current.injectJavaScript(`location.href=${HOME_URL}`);
      setLoading(false);
    }, [])
  );

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: HOME_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Traffic({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: TRAFFIC_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Tour({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: TOUR_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Planning({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: PLANNING_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tabBarStyle: {
    ...Platform.select({
      ios: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10,
      },
      android: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        // marginBottom: 10, // 안드로이드에서는 marginBottom을 제외
      },
    }),
  },
});
