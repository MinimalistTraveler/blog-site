import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { connect } from "react-redux";
import { addUser } from "../store/actions/actions";
import classNames from "classnames";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/register.styl";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: this.props.registerUser.error,
      registerSuccess: this.props.registerUser.registerSuccess
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.registerUser.error,
      registerSuccess: nextProps.registerUser.registerSuccess
    });
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onRegister = async e => {
    const { username, email, password } = this.state;
    this.props.addUser({
      username,
      email,
      password
    });
    if (!this.props.registerUser.registerSuccess) {
      e.preventDefault();
    }
  };
  render() {
    return (
      <Grid>
        <Row center="xs">
          <Col xs={12} lg={7}>
            <Form id="register-form-main">
              <h1>Register</h1>
              <p>Enter in your credientials</p>
              {this.state.error ? (
                <p className="text-white p-2 bg-danger">
                  Check your credientals and try again
                </p>
              ) : null}
              <FormGroup row>
                <UncontrolledTooltip placement="left" target="username">
                  Username must have at least 2 characters but, not longer than
                  30 characters
                </UncontrolledTooltip>
                <Label for="email">Username</Label>
                <Input
                  type="username"
                  name="username"
                  placeholder="username"
                  bsSize="lg"
                  id="username"
                  maxLength="30"
                  onChange={this.onInputChange}
                  className={classNames({ "is-invalid": this.state.error })}
                />
              </FormGroup>
              <FormGroup row>
                <UncontrolledTooltip placement="left" target="email">
                  Must be a valid email address. With the '@ symbol'
                </UncontrolledTooltip>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  bsSize="lg"
                  id="email"
                  onChange={this.onInputChange}
                  className={classNames({ "is-invalid": this.state.error })}
                />
              </FormGroup>
              <FormGroup row>
                <UncontrolledTooltip placement="left" target="password">
                  Cannot include spaces. Must be at least 8 characters long.
                  Have a uppercase, lowercase and must have at least 1 special
                  character (example: %, &, etc)
                </UncontrolledTooltip>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  bsSize="lg"
                  id="password"
                  onChange={this.onInputChange}
                  className={classNames({ "is-invalid": this.state.error })}
                />
              </FormGroup>
              <div className="btn-wrap">
                <LinkContainer to="/">
                  <Button color="primary" onClick={this.onRegister}>
                    Register
                  </Button>
                </LinkContainer>
                <LinkContainer to="/">
                  <Button color="info">Login</Button>
                </LinkContainer>
              </div>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionToProps = {
  addUser
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(Register);
