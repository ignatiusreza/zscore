import React from 'react';

import styles from './hello.module.css';

interface HelloProps {
  name?: string;
}

const Hello: React.FC<HelloProps> = props => <div className={styles.hello}>Hello {props.name}!</div>;

Hello.defaultProps = {
  name: 'David',
};

export default Hello;
