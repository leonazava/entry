import { Component } from "react";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div className="gallery">
        <div className="image-selector-container">
          <div className="image-selector">
            {this.props.images.map((el, i) => (
              <img
                key={i}
                src={el}
                alt={`product ${i}`}
                className={this.state.index === i ? "selected" : ""}
                onClick={() => this.handleClick(i)}
              />
            ))}
          </div>
        </div>
        <div className="image-display">
          <img src={this.props.images[this.state.index]} alt="product image" />
        </div>
      </div>
    );
  }
  handleClick(i) {
    this.setState({ index: i });
  }
}

export default Gallery;
