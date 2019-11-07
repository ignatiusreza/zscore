import React from 'react';
import Renderer from 'react-test-renderer';

import { SAMPLE_DATA } from 'config/constants';
import LineGraph from 'components/line_graph';
import Root from 'routes';

describe('<Root>', () => {
  it('pass sample data to LineGraph', () => {
    const output = Renderer.create(<Root />);
    const root = output.root;

    expect(root.findByType(LineGraph).props.data).toEqual(SAMPLE_DATA);
  });
});
