import React, { useState, useEffect } from 'react';

import { State } from 'components/data_input';
import LineGraph from 'components/line_graph';

const IrregularityGraph: React.FC<State> = props => {
  const { data, threshold, window } = props;
  const [highlights, setHighlights] = useState();

  useEffect(() => {
    const apiCall = async (): Promise<void> => {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props),
      });
      const json = await response.json();

      setHighlights(json.data);
    };

    const timeoutId = setTimeout(() => {
      if (threshold > 0 && window > 0) apiCall();
    }, 300); // debounce, to avoid unneccessary api call during data input

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [props]);

  return <LineGraph data={data} highlights={highlights} />;
};

export default IrregularityGraph;
