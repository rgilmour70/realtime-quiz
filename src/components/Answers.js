// eslint-disable-next-line
import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Answers = (props) => {

  let data = [];


  // this works for mc, not range
  props.question.answers.forEach(a => {
    let tally = props.answers.filter(ua => parseInt(ua.answer) === a.answerId).length;
    let dataElement = {x: a.answerId, y: tally};
    data.push(dataElement);
  });

  const windowWidth = window.innerWidth;
  let chartWidth = 0;
  if (windowWidth <= 700) {
    chartWidth = 0.8 * windowWidth;
  } else {
    chartWidth = 0.6 * windowWidth;
  }
  const chartHeight = 300;
  const chartDomain = [0, 40]; // max class size?

  return (
    <div className="results-display">
      <XYPlot
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
        color="#4682B4"
      >
        <XAxis style={{stroke: 'steelblue'}} />
        <YAxis style={{stroke: 'steelblue'}} />
        <HorizontalGridLines />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
  );
}


export default Answers;