import React from 'react';

import { SAMPLE_DATA } from 'config/constants';
import IrregularityGraph from 'components/irregularity_graph';

const Root: React.FC = () => {
  return <IrregularityGraph data={SAMPLE_DATA} threshold={2} />;
};

export default Root;
