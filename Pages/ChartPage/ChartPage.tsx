import React, { useEffect, useState } from "react";
import { ChartContainer, ChartPageContainer, ChartTitle } from "./Chart.styles";
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default () => {
  interface IResponse {
    label: string;
    report: IDayReport;
  }
  interface IDayReport {
    personal: number;
    break1: number;
    break2: number;
    lunch: number;
    available: number;
  }

  interface IChartData {
    label: string;
    data: number[][];
  }

  const [charts, setCharts] = useState<IChartData[]>(
    [] as unknown as [IChartData]
  );
  const today = new Date();
  const date =
    today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
  const dayOfWeek = today.getDay();
  async function getDateObject(date: string): Promise<IDayReport> {
    const data = await AsyncStorage.getItem("@" + date);
    if (data == null) return null;
    const d = JSON.parse(data) as IDayReport;
    return d;
  }
  async function getDays(dow: number) {
    const result = [] as unknown as [IResponse];
    const diffDays = dow - 1;
    const firstDay = new Date(today.setDate(today.getDate() - diffDays));
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(firstDay.setDate(firstDay.getDate() + i));
      const label =
        newDate.getDate() +
        "/" +
        newDate.getMonth() +
        "/" +
        newDate.getFullYear();
      result.push({ label: label, report: await getDateObject(label) });
    }
    return result;
  }

  function getChartData() {
    setCharts([] as unknown as [IChartData]);
    getDays(today.getDay()).then((data) => {
      data.forEach((report) => {
        if (report.report != null) {
          const cd = Object.values(report.report).map((p: number) => {
            const pt = p > 20 * 60 ? p - 20 * 60 : 0;
            const ot = p - pt * 60;
            return [Math.floor(ot / 60), Math.floor(pt / 60)];
          });
          const dr = { label: report.label, data: cd } as IChartData;
          setCharts((c) => [...c, dr]);
        }
      });
    });
  }

  useEffect(() => {
    setTimeout(() => getChartData(), 2000);
  }, []);

  return (
    <ChartPageContainer>
      {charts.map((chart, index) => {
        return (
          <ChartContainer key={`Container-${index}`}>
            <ChartTitle>{chart.label}</ChartTitle>
            <StackedBarChart
              data={{
                labels: ["Personal", "Break1", "Break2", "Lunch", "Available"],
                data: chart.data,
                legend: ["Ordinary Time", "exceeded Time"],
                barColors: ["black", "red"],
              }}
              width={Dimensions.get("window").width - 2}
              height={220}
              yAxisLabel=""
              hideLegend={false}
              yAxisSuffix=" min."
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: "#1F1E1E",
                backgroundGradientTo: "black",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 3,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "1",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 4,
              }}
            />
          </ChartContainer>
        );
      })}
    </ChartPageContainer>
  );
};
