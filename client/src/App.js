import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import Home from "./components/Home";
import Register from "./components/Register";

// CSS
import "./App.styl";
import { connect } from "react-redux";
import { login } from "./store/actions/actions";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInSuccess: this.props.signInUser.signInSuccess
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ signInSuccess: nextProps.signInUser.signInSuccess });
  }
  componentWillMount() {
    // Check to see if user has a token or not.
    const token = localStorage.getItem("token");

    // If not then keep them on the login screen.
    if (!token) {
      return;
    }
    // If so log them in
    this.props.login();
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar signInSuccess={this.state.signInSuccess} />
          <Switch>
            {this.state.signInSuccess ? (
              <React.Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/blog/:id" component={Blog} />
                <Route path="/blogs/new" component={CreateBlog} />
                <Route path="/blogs/edit/:id" component={EditBlog} />
                <Route path="/register" component={Register} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route exact path="/" component={SignIn} />
                <Route path="/register" component={Register} />
              </React.Fragment>
            )}
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  login
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
