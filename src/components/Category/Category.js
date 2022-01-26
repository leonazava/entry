import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link } from "react-router-dom";
import "./styles.sass";

const query = `
        query {
          categories {
            name
          }
        }
`;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], data: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let [response, error] = await fetchGraphQL(query);
    if (error) {
      console.log(error);
    }
    this.setState({ categories: response.data.categories });
    [response, error] = await fetchGraphQL(`
    query {
    category(input: {title: "all"} ) {
      products {
        name
      }
    }
  }
    `);
    this.setState({ data: response.data.category.products });
  }

  async handleClick(category) {
    this.props.history.push(`/category/${category}`);
    const [response, error] = await fetchGraphQL(`
    query {
    category(input: {title: "${category}"} ) {
      products {
        name,
      }
    }
  }
    `);
    this.setState({ data: response.data.category.products });
  }

  render() {
    return (
      <>
        <h3>category</h3>
        <ul>
          {this.state.categories?.map(({ name }) => (
            <li key={name} onClick={() => this.handleClick(name)}>
              {name}
            </li>
          ))}
        </ul>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
        <ul style={{ marginTop: "1rem" }}>
          {this.state.data?.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Category;
