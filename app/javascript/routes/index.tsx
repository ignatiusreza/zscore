import React from 'react';

import DataInput, { State } from 'components/data_input';
import IrregularityGraph from 'components/irregularity_graph';

const Root: React.FC = () => {
  return <DataInput render={(state: State): React.ReactElement => <IrregularityGraph {...state} />} />;
};

export default Root;
