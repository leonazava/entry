import { Component } from "react";

// all of the below together
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
}

// a component for each set of attributes for the product
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
                <SwatchElement value={el.value} />
              ) : (
                <BoxElement value={el.value} />
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
    let { isSelected, isSwatch } = this.props;
    return (
      <li
        className={`options-box ${isSelected ? "selected" : ""}  ${
          isSwatch ? "swatch" : ""
        }
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

class BoxElement extends Component {
  render() {
    return <div className="box-option">{this.props.value}</div>;
  }
}

class SwatchElement extends Component {
  render() {
    return (
      <div className="swatch-option" style={{ "--bg": this.props.value }} />
    );
  }
}

export default Options;
