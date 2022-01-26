import React, { Component } from "react";
import fetchGraphQL from "./components/fetchGraphQL";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { Category, Cart } from "./components";
import { createBrowserHistory } from "history";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/category/:category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<div>not found</div>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
