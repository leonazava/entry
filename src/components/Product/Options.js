import { Component } from "react";

class Options extends Component {
  render() {
    return (
      <ul
        className="options-select"
        style={{
          "--cols": this.props.items.length <= 4 ? 4 : this.props.items.length,
        }}
      >
        {this.props.items.map((el, i) => (
          <OptionBox
            key={i}
            isSelected={this.props.selectedOption === i}
            handleClick={() => this.props.handleOptionClick(i)}
          >
            <p>{el.value}</p>
          </OptionBox>
        ))}
      </ul>
    );
  }
}

class OptionBox extends Component {
  render() {
    return (
      <li
        className={`options-box ${this.props.isSelected ? "selected" : ""}`}
        // onClick={this.props.handleClick}
        onClick={(e) => {
          e.stopPropagation();
          this.props.handleClick();
        }}
      >
        {this.props.children}
      </li>
    );
  }
}

export default Options;
