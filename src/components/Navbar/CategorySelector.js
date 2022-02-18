import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assign } from "store/categoryStore";
import fetchGraphQL from "components/fetchGraphQL";

class CategorySelectorClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    // on ititial load, get the starting selected category from the URL
    this.props.initialCategory &&
      this.props.assign(this.props.initialCategory());
    // fetch the existing selectable categories
    const [response, error] = await fetchGraphQL(`query {categories { name }}`);
    if (error) {
      console.log("error");
      return;
    }
    this.setState({ value: response.data.categories });
  }

  componentWillUnmount() {
    this.props.assign("");
    window.scrollTo(0, 0);
  }

  render() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <>
        {" "}
        {this.state.value.map(({ name }) => (
          <div
            key={name}
            onClick={() => this.handleClick(name)}
            className={this.props.category.value === name ? "active" : ""}
          >
            <Link to={`/category/${name}`}>
              <h3>{capitalize(name)}</h3>
            </Link>
          </div>
        ))}
      </>
    );
  }

  handleClick(name) {
    this.props.assign(name);
  }
}

export const CategorySelector = connect(
  (state) => ({ category: state.category }),
  {
    assign,
  }
)(CategorySelectorClass);
