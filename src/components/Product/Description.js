import { Component } from "react";

class Description extends Component {
  render() {
    return (
      <div className="product__description">
        {this.props.body.replaceAll(/<[\s\S]*?>/g, "")}
      </div>
    );
  }
}

export default Description;
