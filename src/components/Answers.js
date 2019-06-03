import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

class Answers extends Component {

  render() {

    let t = this.props.answers.filter(a => a.answer === 'true').length;
    let f = this.props.answers.filter(a => a.answer === 'false').length;
    let data = [
      {x: 'T', y: t},
      {x: 'F', y: f},
    ];
    const chartWidth = 200;
    const chartHeight = 150;
    const chartDomain = [0, chartHeight];

    return (
      <div className="results-display">
        <div>True: {this.props.answers.filter(a => a.answer === 'true').length}</div>
        <div>False: {this.props.answers.filter(a => a.answer === 'false').length} </div>
        <br />
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
}

export default Answers;