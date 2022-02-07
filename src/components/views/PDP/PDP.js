import { Component } from "react";
import Product from "components/Product/Product";
import getParams from "components/getParams";
import "./styles.sass";

class PDP extends Component {
  render() {
    return (
      <div className="PDP">
        <Product id={this.getId()} />
      </div>
    );
  }

  getId() {
    let id = getParams(
      this.props.history.location.pathname,
      this.props.match.path
    ).id;
    return id;
  }
}

export default PDP;
