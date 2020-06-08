import React, { Fragment, useReducer } from 'react';

import { SAMPLE_DATA } from 'config/constants';

import styles from './styles.module.css';

interface InputState {
  data: string;
  threshold: string;
  window: string;
}

export interface State {
  data: Array<number>;
  threshold: number;
  window: number;
}

interface DataInputProps {
  render: (state: State) => React.ReactElement;
}

interface Action {
  type: string;
  payload: string;
}

const initialState: InputState = {
  data: SAMPLE_DATA.join(','),
  threshold: '2.5',
  window: '7',
};

function reducer(state: InputState, action: Action): InputState {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload };
    case 'setThreshold':
      return { ...state, threshold: action.payload };
    case 'setWindow':
      return { ...state, window: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function fromInputState(inputState: InputState): State {
  return {
    data: inputState.data.split(',').map((value) => Number(value) || 0),
    threshold: Number(inputState.threshold) || 0,
    window: Number(inputState.window) || 0,
  };
}

const DataInput: React.FC<DataInputProps> = ({ render }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateState = (type: string) => (event: React.FormEvent<HTMLInputElement>): void => {
    dispatch({ type: type, payload: event.currentTarget.value });
  };

  return (
    <Fragment>
      <form className={styles.form}>
        <label>
          Data
          <input type="text" value={state.data} onChange={updateState('setData')} />
        </label>

        <div className={styles.split}>
          <label className={styles.threshold}>
            Threshold
            <input type="number" step="0.1" value={state.threshold} onChange={updateState('setThreshold')} />
          </label>

          <label>
            Window
            <input type="number" value={state.window} onChange={updateState('setWindow')} />
          </label>
        </div>
      </form>
      {render(fromInputState(state))}
    </Fragment>
  );
};

export default DataInput;
