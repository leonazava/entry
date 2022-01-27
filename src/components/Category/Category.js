import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link } from "react-router-dom";
import "./styles.sass";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "all", categories: [], data: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let [response, error] = await fetchGraphQL(`
    query {
      categories { name },
    category(input: {title: "${this.state.current}"} ) {
      products {
        name
      }
    }
  }
    `);

    this.setState({
      categories: response.data.categories,
      data: response.data.category.products,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.current === this.state.current) return;
    const [response, error] = await fetchGraphQL(`
    query {
    category(input: {title: "${this.state.current}"} ) {
      products {
        name,
      }
    }
  }
    `);
    if (error) {
      console.log(error);
    }
    this.setState({ data: response.data.category.products });
  }

  async handleClick() {
    this.setState({ current: this.props.match.params.category });
  }

  render() {
    return (
      <>
        <h3>category</h3>
        <ul>
          {this.state.categories?.map(({ name }) => (
            <li key={name} onClick={this.handleClick}>
              <Link to={`/category/${name}`}>{name}</Link>
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
