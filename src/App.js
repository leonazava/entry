import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { PLP, Navbar, PDP, Bag } from "components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="views">
            <Switch>
              {" "}
              <Route path="/category/:category" component={PLP} />
              <Route exact path="/">
                <Redirect to="/category/all" component={PLP} />
              </Route>
              <Route path="/product/:id" component={PDP} />
              <Route path="/bag" component={Bag} />
            </Switch>
            <div className="curtain" />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
