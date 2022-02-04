import React, { Component } from "react";
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
    // on ititial load, fetch different data on initial mount depending on the starting URL
    this.props.assign(this.getCategory());
    const [response, error] = await fetchGraphQL(`query {categories { name }}`);
    if (error) {
      console.log("error");
      return;
    }
    this.setState({ value: response.data.categories });
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
