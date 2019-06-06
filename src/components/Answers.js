// eslint-disable-next-line
import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Answers = (props) => {

  // console.log(props);
  const type = props.question.type;

  let data = [];

  props.question.answers.forEach(a => {
    let tally = props.answers.filter(ua => parseInt(ua.answer) === a.answerId).length;
    let dataElement = {x: a.answerId, y: tally};
    data.push(dataElement);
  });

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