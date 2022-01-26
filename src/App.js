import React, { Component } from "react";
import fetchGraphQL from "./components/fetchGraphQL";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { Category, Cart } from "./components";
import { createBrowserHistory } from "history";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
    this.history = createBrowserHistory();
  }
  componentDidMount() {
    // this.history.listen((location) => console.log(location));
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/category/:category"
              element={<Category history={this.history} />}
            />
            <Route path="/cart" element={<Cart history={this.history} />} />
            <Route path="*" element={<div>not found</div>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
