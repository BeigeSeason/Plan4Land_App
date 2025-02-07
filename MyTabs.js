import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
const HOME_URL = "https://plan4land.store";
const TRAFFIC_URL = "https://plan4land.store/traffic";
const TOUR_URL = "https://plan4land.store/tourlist";
const PLANNING_URL = "https://plan4land.store/planninglist";

// const HOME_URL = "http://13.124.49.40:8111/";
// const TRAFFIC_URL = "http://13.124.49.40:8111/traffic";
// const TOUR_URL = "http://13.124.49.40:8111/tourlist";
// const PLANNING_URL = "http://13.124.49.40:8111/planninglist";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const [selectedTab, setSelectedTab] = useState("메인");
  return (
    <Tab.Navigator
      initialRouteName="메인"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: "#18617e",
      }}
    >
      <Tab.Screen
        name="메인"
        component={HomeMenu}
        initialParams={{ setSelectedTab }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo
              name={"home"}
              size={28}
              color={selectedTab !== "메인" ? "gray" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"교통"}
        component={Traffic}
        initialParams={{ setSelectedTab }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="bus"
              size={26}
              color={selectedTab === "교통" ? "#18617e" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"관광지"}
        component={Tour}
        initialParams={{ setSelectedTab }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="map-marker"
              size={28}
              color={selectedTab === "관광지" ? "#18617e" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"플래닝"}
        component={Planning}
        initialParams={{ setSelectedTab }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="calendar-check"
              size={27}
              color={selectedTab === "플래닝" ? "#18617e" : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation, route }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedTab } = route.params;
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      setSelectedTab("메인");
    }, [])
  );
  React.useEffect(() => {
    navigation.addListener("tabPress", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "메인" }],
      });
    });
    setSelectedTab("메인");
  }, [navigation]);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;

    if (url.includes("traffic")) {
      setSelectedTab("교통");
    } else if (url.includes("tour")) {
      setSelectedTab("관광지");
    } else if (url.includes("planning")) {
      setSelectedTab("플래닝");
    }
  };

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={key}
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: HOME_URL }}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Traffic({ navigation, route }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedTab } = route.params;
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      setSelectedTab("교통");
    }, [])
  );
  React.useEffect(() => {
    navigation.addListener("tabPress", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "교통" }],
      });
    });
    setSelectedTab("교통");
  }, [navigation]);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={key}
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: TRAFFIC_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Tour({ navigation, route }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedTab } = route.params;
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      setSelectedTab("관광지");
    }, [])
  );
  React.useEffect(() => {
    navigation.addListener("tabPress", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "관광지" }],
      });
    });
    setSelectedTab("관광지");
  }, [navigation]);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={key}
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: TOUR_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Planning({ navigation, route }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedTab } = route.params;
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
      setSelectedTab("플래닝");
    }, [])
  );
  React.useEffect(() => {
    navigation.addListener("tabPress", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "플래닝" }],
      });
    });
    setSelectedTab("플래닝");
  }, [navigation]);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={key}
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
        height: 65,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10,
        position: "absolute",
      },
      android: {
        height: 65,
        paddingTop: 8,
        paddingBottom: 8,
        position: "absolute",
        // marginBottom: 10, // 안드로이드에서는 marginBottom을 제외
      },
    }),
  },
});
