import React from 'react';

import { SAMPLE_DATA } from 'config/constants';
import LineGraph from 'components/line_graph';

const Root: React.FC = () => {
  return <LineGraph data={SAMPLE_DATA} />;
};

export default Root;
