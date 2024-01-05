import React from "react";
import StateDemo from "./StateDemo";
class BaseUseDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <StateDemo />
      </div>
    );
  }
}

export default BaseUseDemo;
