import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainPage from "./Pages/MainPage/MainPage";
import ChartPage from "./Pages/ChartPage/ChartPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./components/tabBar/TabBar";

export default () => {
  const Stak = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stak.Navigator tabBar={TabBar} initialRouteName="Time">
        <Stak.Screen
          name="Time"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stak.Screen
          name="settings"
          component={ChartPage}
          options={{ headerShown: false }}
        />
        <Stak.Screen
          name="Charts"
          component={ChartPage}
          options={{ headerShown: false }}
        />
      </Stak.Navigator>
    </NavigationContainer>
  );
};
