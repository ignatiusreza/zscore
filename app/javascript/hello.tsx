import React from "react";
import ReactDOM from "react-dom";

const Hello = props => <div>Hello {props.name}!</div>;

Hello.defaultProps = {
  name: "David"
};

export default Hello;
