import React from 'react';

import styles from './styles.module.css';

interface LineGraphProps {
  data: Array<number>;
  highlights?: Array<number>;
}

interface Reducer {
  memo: Array<[number, number]>;
  prev?: number;
}

const PADDING = 10;
const SCALE = 10;
const toScale = (a: number): number => a * SCALE;
const highlightReducer = ({ memo, prev }: Reducer, curr: number, index: number): Reducer => {
  const lastGroup = memo[memo.length - 1];

  if (curr) {
    if (!prev) memo.push([index, 0]);
    else lastGroup[1]++;
  }

  return { memo, prev: curr };
};

const LineGraph: React.FC<LineGraphProps> = ({ data, highlights }) => {
  const width = data.length;
  const height = Math.max(...data) + 1;
  const points = data.map((point, index) => `${toScale(index)},${toScale(height - point)}`).join(' ');
  const rects = highlights.reduce(highlightReducer, { memo: [] }).memo;

  return (
    <div className={styles.container}>
      <svg
        viewBox={`${-PADDING} 0 ${toScale(width) + PADDING} ${toScale(height) + PADDING}`}
        width={toScale(width) + PADDING * 2}
        height={toScale(height) + PADDING * 2}
        className={styles.chart}
      >
        <polyline className={styles.line} points={points} />

        <g className={styles.grid}>
          <line x1="0" y1={toScale(height)} x2="0" y2="0"></line>
          <line x1="0" y1={toScale(height)} x2={toScale(width)} y2={toScale(height)}></line>
        </g>

        <g className={`${styles.labels} ${styles.xLabels}`}>
          {Array.from(Array(width)).map((_, index) => (
            <text key={index} x={toScale(index)} y={toScale(height)}>
              {index}
            </text>
          ))}
        </g>
        <g className={`${styles.labels} ${styles.yLabels}`}>
          {Array.from(Array(height)).map((_, index) => (
            <text key={index} x="0" y={toScale(height - index)}>
              {index}
            </text>
          ))}
        </g>

        <g className={styles.highlights}>
          {rects.map(([start, width], index) => (
            <rect key={index} x={toScale(start)} width={toScale(width)} height={toScale(height)} />
          ))}
        </g>
      </svg>
    </div>
  );
};

LineGraph.defaultProps = {
  highlights: [],
};

export default LineGraph;
