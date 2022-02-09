import { Component } from "react";
import "./options.sass";

// all of the below together
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleClick = this.handleClick.bind(this);
  }
  // create a temp object, assign it properties according to the relevant attributes, and then set the state to that obj
  componentDidMount() {
    this.props.setOptions(this.props.attributes);
  }
  render() {
    return (
      <>
        {this.props.attributes.map((el, i) => {
          return (
            <AttributeField
              key={i}
              data={el}
              currentSelection={this.props.options}
              handleClick={this.props.handleClick}
            />
          );
        })}
      </>
    );
  }
  // handleClick(attr, i) {
  //   this.setState({ [attr]: i });
  // }
}

// a component for each set of attributes for the prpoduct
class AttributeField extends Component {
  render() {
    let { items, name, type } = this.props.data;
    return (
      <div className="attribute-field">
        <h2>{name.toUpperCase()}:</h2>
        <ul
          className="options-select"
          style={{
            "--cols": items.length <= 4 ? 4 : items.length,
          }}
        >
          {this.props.data.items.map((el, i) => (
            <OptionBox
              key={i}
              isSwatch={type === "swatch"}
              value={el.value}
              name={name}
              isSelected={this.props.currentSelection[name] === i}
              handleClick={() => this.props.handleClick(name, i)}
            >
              {type === "swatch" ? (
                <div
                  className={`swatch ${el.displayValue}`}
                  style={{ "--bg": el.value }}
                />
              ) : (
                <p>{el.value}</p>
              )}
            </OptionBox>
          ))}
        </ul>
      </div>
    );
  }
}

// the selectable options boxes
class OptionBox extends Component {
  render() {
    let { isSelected } = this.props;
    return (
      <li
        className={`options-box ${isSelected ? "selected" : ""} 
        `}
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
