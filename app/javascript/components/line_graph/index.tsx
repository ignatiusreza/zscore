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
      <div className={styles.chart}>
        <svg
          viewBox={`${-PADDING} 0 ${toScale(width) + PADDING} ${toScale(height) + PADDING}`}
          width={toScale(width) + PADDING * 2}
          height={toScale(height) + PADDING * 2}
        >
          <polyline className={styles.line} points={points} />

          <g>
            {rects.map(([start, width], index) =>
              width > 0 ? (
                <rect
                  key={index}
                  x={toScale(start)}
                  width={toScale(width)}
                  height={toScale(height)}
                  className={styles.rectHighlight}
                />
              ) : (
                <line
                  key={index}
                  x1={toScale(start)}
                  y1={0}
                  x2={toScale(start)}
                  y2={toScale(height)}
                  className={styles.lineHighlight}
                />
              ),
            )}
          </g>

          <line x1="0" y1={toScale(height)} x2={toScale(width)} y2={toScale(height)} className={styles.grid}></line>
          <g className={`${styles.labels} ${styles.xLabels}`}>
            {Array.from(Array(width)).map((_, index) => (
              <text key={index} x={toScale(index)} y={toScale(height)}>
                {index}
              </text>
            ))}
          </g>
        </svg>
      </div>
      <div className={styles.frozen}>
        <div className={styles.whiteout}></div>
        <svg
          viewBox={`${-PADDING} 0 ${toScale(width) + PADDING} ${toScale(height) + PADDING}`}
          width={toScale(width) + PADDING * 2}
          height={toScale(height) + PADDING * 2}
        >
          <rect x={-PADDING} width={PADDING} height={toScale(height)} className={styles.whiteout} />
          <rect x={-PADDING} y={toScale(height)} width={PADDING / 1.5} height={PADDING} className={styles.whiteout} />
          <line x1="0" y1={toScale(height)} x2="0" y2="0" className={styles.grid}></line>
          <g className={`${styles.labels} ${styles.yLabels}`}>
            {Array.from(Array(height)).map((_, index) => (
              <text key={index} x="0" y={toScale(height - index)}>
                {index}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

LineGraph.defaultProps = {
  highlights: [],
};

export default LineGraph;
