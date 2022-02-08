import { Component, createRef } from "react";

class Description extends Component {
  constructor(props) {
    super(props);
    this.descriptionRef = createRef();
  }
  componentDidMount() {
    this.descriptionRef.current.innerHTML = this.props.body;
  }
  render() {
    return <div className="product__description" ref={this.descriptionRef} />;
  }
}

export default Description;
