import React from 'react';
import Renderer from 'react-test-renderer';

import { SAMPLE_DATA } from 'config/constants';
import LineGraph from 'components/line_graph';

describe('<LineGraph>', () => {
  it('match snapshots for sample data', () => {
    const output = Renderer.create(<LineGraph data={SAMPLE_DATA} />).toJSON();

    expect(output).toMatchSnapshot();
  });
});
