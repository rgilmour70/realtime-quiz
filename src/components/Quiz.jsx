// eslint-disable-next-line
import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice2';
import Range from './Range';

const Quiz = (props) => {
  const { type, channelName } = props;
  if (type === 'multipleChoice') {
    return (
      <MultipleChoice {...props} channelName={channelName} />
    );
  }
  return (
    <Range {...props} channelName={channelName} />
  );
};

export default Quiz;
