import React, { Component } from "react";
import fetchGraphQL from "./components/fetchGraphQL";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Cart } from "./components";

const query = `
        query {
          categories {
            name
          }
        }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }
  async componentDidMount() {
    let data;
    data = await fetchGraphQL(query);
    console.log(data);
    this.setState({ ...data });
  }
  render() {
    return (
      <>
        {/* <ul>
          {this.state.data?.categories?.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
