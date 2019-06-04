// eslint-disable-next-line
import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Answers = (props) => {

  let t = props.answers.filter(a => a.answer === 'true').length;
  let f = props.answers.filter(a => a.answer === 'false').length;
  let data = [
    {x: 'T', y: t},
    {x: 'F', y: f},
  ];
  const chartWidth = 300;
  const chartHeight = 200;
  const chartDomain = [0, 40]; // max class size?

  return (
    <div className="results-display">
      <XYPlot
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
      >
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
  );
}



export default Answers;