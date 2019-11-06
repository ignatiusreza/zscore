import React from 'react';
import Hello from 'hello';

describe('Hello', () => {
  it('works for testing react component', () => {
    expect(<Hello />).toMatchSnapshot();
  });
});
