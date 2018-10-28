import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { logoutUser } from "../store/actions/actions";
import "../CSS/navbar.css";
import classNames from "classnames";
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      signInSuccess: this.props.signInSuccess
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.signInUser.signInSuccess === true) {
      this.setState({ signInSuccess: nextProps.signInUser.signInSuccess });
    }
    this.setState({ signInSuccess: nextProps.signInSuccess });
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onSignOut = () => {
    this.props.logoutUser();
  };
  render() {
    const { signInSuccess } = this.state;
    return (
      <Navbar className="menu" light expand="md">
        <NavbarBrand id="logo">Blog Site</NavbarBrand>
        <NavbarToggler onClick={this.toggle} id="toggler">
          <img
            src="./images/menu.png"
            alt=""
            style={{ display: "block", width: "100%" }}
            className={classNames({
              hidden: this.state.isOpen
            })}
          />
          <img
            src="./images/close.png"
            alt=""
            style={{ display: "block", width: "100%" }}
            className={classNames({
              hidden: !this.state.isOpen
            })}
          />
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="p-2 ml-auto">
              {!signInSuccess ? (
                <LinkContainer to="/">
                  <NavLink>Sign In</NavLink>
                </LinkContainer>
              ) : (
                <div onClick={this.onSignOut} style={{ cursor: "pointer" }}>
                  <NavLink>Sign Out</NavLink>
                </div>
              )}
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem className="p-2">
              <LinkContainer to="/">
                <NavLink>Home</NavLink>
              </LinkContainer>
            </NavItem>
            <NavItem className="p-2">
              <NavLink href="https://github.com/MinimalistTraveler/blog-site">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  logoutUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navigation);
