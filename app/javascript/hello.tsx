import React from 'react';

interface HelloProps {
  name?: string;
}

const Hello: React.FC<HelloProps> = props => <div>Hello {props.name}!</div>;

Hello.defaultProps = {
  name: 'David',
};

export default Hello;
