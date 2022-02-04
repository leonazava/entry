import React, { Component } from "react";
import { Link, matchPath } from "react-router-dom";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { assign } from "store/categoryStore";

class CategorySelectorClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    // fetch different data on initial mount depending on the starting URL
    this.props.assign(this.getParams());
    // use react router listen function to react to route changes
    this.unlisten = this.props.history.listen(() => {
      // prevent listener from running on unmount
      if (!this.props.history.location.pathname.includes("category")) return;
      // get currently selected category from the URL parameters & use it to update the corresponding state property
      this.props.assign(this.getParams());
    });
    // fetch the endpoint using the state
    const [response, error] = await fetchGraphQL(`query {categories { name }}`);
    if (error) {
      console.log("error");
      return;
    }
    this.setState({ value: response.data.categories });
  }

  // remove history listener on unmount
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <ul className="PLP__selector">
        {this.state.value.map(({ name }) => (
          <li key={name}>
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

  getParams() {
    let { category } = matchPath(this.props.history.location.pathname, {
      path: this.props.match.path,
    }).params;
    return category;
  }
}

export const CategorySelector = connect(
  (state) => ({ category: state.category }),
  {
    assign,
  }
)(CategorySelectorClass);
