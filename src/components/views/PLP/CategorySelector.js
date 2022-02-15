import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assign } from "store/categoryStore";
import fetchGraphQL from "components/fetchGraphQL";
import getParams from "components/getParams";

class CategorySelectorClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    // on ititial load, get the starting selected category from the URL
    this.props.assign(this.getCategory());
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
      <ul className="PLP__selector">
        {this.state.value.map(({ name }) => (
          <li key={name} onClick={() => this.handleClick(name)}>
            <Link to={`/category/${name}`}>
              <h1
                className={this.props.category.value === name ? "active" : ""}
              >
                {capitalize(name)}
              </h1>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  getCategory() {
    let { category } = getParams(
      this.props.history.location.pathname,
      this.props.match.path
    );
    return category;
  }

  handleClick(name) {
    this.props.assign(this.getCategory());
  }
}

export const CategorySelector = connect(
  (state) => ({ category: state.category }),
  {
    assign,
  }
)(CategorySelectorClass);
