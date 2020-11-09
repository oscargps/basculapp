import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Loader from "../components/loader";
const ChartLines = ({data,xlabel,ylabel}) => {
  return (
    <Chart
      width={"100%"}
      height={"90%"}
      chartType="LineChart"
      loader={
        <div>
          <Loader />
        </div>
      }
      data={data}
      options={{
        hAxis: {
          title: {xlabel},
        },
        vAxis: {
          title: {ylabel},
        },
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default ChartLines;
