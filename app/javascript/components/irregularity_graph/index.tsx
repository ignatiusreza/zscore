import React, { useState, useEffect } from 'react';

import LineGraph from 'components/line_graph';

interface IrregularityGraphProps {
  data: Array<number>;
  threshold: number;
}

const IrregularityGraph: React.FC<IrregularityGraphProps> = ({ data, threshold }) => {
  const [highlights, setHighlights] = useState();

  useEffect(() => {
    const apiCall = async (): Promise<void> => {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, threshold }),
      });
      const json = await response.json();

      setHighlights(json.data);
    };

    apiCall();
  }, [data]);

  return <LineGraph data={data} highlights={highlights} />;
};

export default IrregularityGraph;
