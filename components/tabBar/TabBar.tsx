import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBarContainer, TabItem } from "./TabBar.styles";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faCog, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default (props: BottomTabBarProps) => {
  const icons = [faClock, faCog, faChartLine];
  const { state, navigation } = props;
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        var isFocused = state.index === index;
        return (
          <TouchableOpacity
            style={{ margin: 0, padding: 0, width: "33.33%" }}
            key={`item-${index}`}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
            <TabItem selected={isFocused}>
              <Text>
                <FontAwesomeIcon
                  icon={icons[index]}
                  style={{ color: isFocused ? "white" : "black" }}
                />
              </Text>
            </TabItem>
          </TouchableOpacity>
        );
      })}
    </TabBarContainer>
  );
};
