// eslint-disable-next-line
import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import Range from './Range';

const Quiz = (props) => {
  const { question, channelName } = props;
  switch (question.type) {
    case 'range':
      return <Range {...props} channelName={channelName} />;
    default:
      return <MultipleChoice {...props} channelName={channelName} />;
  }
};

export default Quiz;
