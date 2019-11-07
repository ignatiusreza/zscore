import React from 'react';
import Hello from 'hello';
import renderer from 'react-test-renderer';

describe('Hello', () => {
  it('works for testing react component', () => {
    const output = renderer.create(<Hello />).toJSON();

    expect(output).toMatchSnapshot();
  });
});
