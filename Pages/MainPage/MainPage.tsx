import React, { Dispatch, SetStateAction, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  ClockName,
  ClockTime,
  Logo,
  LogoContainer,
  MainContainer,
  StandardClock,
  TitleText,
} from "./MainPage.styles";
import { useTimeParser } from "../../hooks/useTimeParser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const timeParser = useTimeParser();
  const [personal, setPersonal] = useState<number>(60 * 20);
  const [break1, setBreak1] = useState<number>(60 * 20);
  const [break2, setBreak2] = useState<number>(60 * 20);
  const [lunch, setLunch] = useState<number>(60 * 60);
  const [available, setAvailable] = useState(0);
  const [currentTimer, setCurrentTimer] = useState<
    "personal" | "break1" | "break2" | "lunch" | "available"
  >("available");
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [running, setRunning] = useState(false);

  const today = new Date();
  const date =
    today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

  const getBtnStatus = (
    timer: "personal" | "break1" | "break2" | "lunch" | "available"
  ): "active" | "inactive" | "disabled" | "available" => {
    switch (timer) {
      case "personal":
        if (personal < 0) return "disabled";
        else if (currentTimer == "personal") return "active";
        else return "inactive";
      case "break1":
        if (break1 < 0) return "disabled";
        else if (currentTimer == "break1") return "active";
        else return "inactive";
      case "break2":
        if (break2 < 0) return "disabled";
        else if (currentTimer == "break2") return "active";
        else return "inactive";
      case "lunch":
        if (lunch < 0) return "disabled";
        else if (currentTimer == "lunch") return "active";
        else return "inactive";
      case "available":
        if (currentTimer == "available") return "available";
        else return "inactive";
    }
  };
  async function addTime(
    time: number,
    setTime: Dispatch<SetStateAction<number>>
  ) {
    if (time < 60) setTime((t) => t + 1);
    else setTime(0);
    const dateObject =
      (await AsyncStorage.getItem("@" + date)) == null
        ? {
            personal: 0,
            break1: 0,
            break2: 0,
            lunch: 0,
            available: 0,
          }
        : JSON.parse(await AsyncStorage.getItem("@" + date));

    switch (currentTimer) {
      case "personal":
        setPersonal(personal - 1);
        AsyncStorage.setItem(
          "@" + date,
          JSON.stringify({
            ...dateObject,
            personal: personal + 1,
          })
        );
        break;
      case "break1":
        setBreak1(break1 - 1);
        AsyncStorage.setItem(
          "@" + date,
          JSON.stringify({
            ...dateObject,
            break1: break1 + 1,
          })
        );
        break;
      case "break2":
        setBreak2(break2 - 1);
        AsyncStorage.setItem(
          "@" + date,
          JSON.stringify({
            ...dateObject,
            break2: break2 + 1,
          })
        );
        break;
      case "lunch":
        setLunch(lunch - 1);
        AsyncStorage.setItem(
          "@" + date,
          JSON.stringify({
            ...dateObject,
            lunch: lunch + 1,
          })
        );
        break;
      case "available":
        setAvailable(available + 1);
        AsyncStorage.setItem(
          "@" + date,
          JSON.stringify({
            ...dateObject,
            available: available + 1,
          })
        );
        break;
    }
  }
  setTimeout(() => addTime(currentTime, setCurrentTime), 1000);

  return (
    <MainContainer>
      <LogoContainer>
        <Logo source={require("../../assets/Resideo.png")}></Logo>
      </LogoContainer>
      <TitleText>Time Manager</TitleText>

      <TouchableOpacity
        style={{ height: "auto", width: "auto" }}
        disabled={getBtnStatus("personal") != "inactive"}
        onPress={() => setCurrentTimer("personal")}
      >
        <StandardClock status={getBtnStatus("personal")}>
          <ClockName>Personal</ClockName>
          <ClockTime>{timeParser(personal)}</ClockTime>
        </StandardClock>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={getBtnStatus("break1") != "inactive"}
        style={{ height: "auto", width: "auto" }}
        onPress={() => setCurrentTimer("break1")}
      >
        <StandardClock status={getBtnStatus("break1")}>
          <ClockName>Break 1</ClockName>
          <ClockTime>{timeParser(break1)}</ClockTime>
        </StandardClock>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={getBtnStatus("break2") != "inactive"}
        style={{ height: "auto", width: "auto" }}
        onPress={() => setCurrentTimer("break2")}
      >
        <StandardClock status={getBtnStatus("break2")}>
          <ClockName>Break 2</ClockName>
          <ClockTime>{timeParser(break2)}</ClockTime>
        </StandardClock>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={getBtnStatus("lunch") != "inactive"}
        style={{ height: "auto", width: "auto" }}
        onPress={() => setCurrentTimer("lunch")}
      >
        <StandardClock status={getBtnStatus("lunch")}>
          <ClockName>Lunch</ClockName>
          <ClockTime>{timeParser(lunch)}</ClockTime>
        </StandardClock>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={getBtnStatus("available") != "inactive"}
        style={{
          height: "auto",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        onPress={() => setCurrentTimer("available")}
      >
        <StandardClock status={getBtnStatus("available")}>
          <ClockName>Available</ClockName>
        </StandardClock>
      </TouchableOpacity>
    </MainContainer>
  );
};
