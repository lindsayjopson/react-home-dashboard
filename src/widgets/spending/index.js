import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

const data = [
  { x: "Jan", y: -2286.32 },
  { x: "Feb", y: 1696.09 },
  { x: "Mar", y: 382.93 },
  { x: "Apr", y: 904.93 },
  { x: "May", y: -783.15 },
  { x: "Jun", y: 1129.76 },
  { x: "Jul", y: 2756.0 },
  { x: "Aug", y: 819.63 },
  { x: "Sep", y: -235.01 }
];

// Put it all together...
const strokeColor = data[data.length - 1].y > 0 ? "#5ece9b" : "#ce5e5e";
const theme = {
  axis: {
    style: {
      grid: {
        fill: "none",
        stroke: "none",
        pointerEvents: "painted"
      },
      tickLabels: {
        fontSize: "12px",
        fontFamily: "inherit"
      }
    }
  },
  line: {
    style: {
      data: {
        fill: "transparent",
        stroke: strokeColor,
        strokeWidth: 3
      }
    }
  }
};

export class SpendingWidget extends React.Component {
  render() {
    return (
      <div className="widget spending">
        <div className="heading">Spending Trend</div>
        <VictoryChart theme={theme} domainPadding={2} height={280}>
          <VictoryAxis
            style={{
              axis: { stroke: "none" },
              tickLabels: {
                fontSize: 16,
                fill: "#ffffff",
                fontWeight: "400",
                padding: 10
              }
            }}
            dependentAxis
          />
          <VictoryLine interpolation="natural" data={data} />
        </VictoryChart>
      </div>
    );
  }
}
