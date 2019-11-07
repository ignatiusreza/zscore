import React, { Fragment, useReducer } from 'react';

import { SAMPLE_DATA } from 'config/constants';

import styles from './styles.module.css';

interface DataInputProps {
  render: Function;
}

interface InputState {
  data: string;
  threshold: string;
}

export interface State {
  data: Array<number>;
  threshold: number;
}

interface Action {
  type: string;
  payload: string;
}

const initialState: InputState = {
  data: SAMPLE_DATA.join(','),
  threshold: '2',
};

function reducer(state: InputState, action: Action): InputState {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload };
    case 'setThreshold':
      return { ...state, threshold: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function fromInputState(inputState: InputState): State {
  return {
    data: inputState.data.split(',').map(value => Number(value) || 0),
    threshold: Number(inputState.threshold) || 0,
  };
}

const DataInput: React.FC<DataInputProps> = ({ render }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateData = (event: React.FormEvent<HTMLInputElement>): void => {
    dispatch({ type: 'setData', payload: event.currentTarget.value });
  };

  const updateThreshold = (event: React.FormEvent<HTMLInputElement>): void => {
    dispatch({ type: 'setThreshold', payload: event.currentTarget.value });
  };

  return (
    <Fragment>
      <form className={styles.form}>
        <label>
          Data
          <input type="text" value={state.data} onChange={updateData} />
        </label>

        <label className={styles.threshold}>
          Threshold
          <input type="number" step="0.1" value={state.threshold} onChange={updateThreshold} />
        </label>
      </form>
      {render(fromInputState(state))}
    </Fragment>
  );
};

export default DataInput;
