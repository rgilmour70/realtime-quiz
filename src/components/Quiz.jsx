// eslint-disable-next-line
import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import Range from './Range';

const Quiz = (props) => {
  const { type, channelName } = props;
  if (type === 'range') {
    return <Range {...props} channelName={channelName} />;
  }
  return <MultipleChoice {...props} channelName={channelName} />;
};

export default Quiz;
