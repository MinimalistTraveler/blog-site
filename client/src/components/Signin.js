import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/home.css";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/actions";
import classNames from "classnames";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: this.props.signInUser.error
    };
  }
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps.signInUser;
    if (error) {
      this.setState({ error });
    }
  }
  onLoginUser = () => {
    try {
      const { email, password } = this.state;
      return this.props.loginUser({
        email,
        password
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  onInputChange = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Grid>
        <Row center="xs">
          <Col xs={12} lg={6}>
            <Form id="form-main">
              <h1>Login</h1>
              {this.state.error ? (
                <p className="text-white p-2 bg-danger">
                  Invalid username or password
                </p>
              ) : null}
              <FormGroup row>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="email"
                  bsSize="lg"
                  onChange={this.onInputChange}
                  className={classNames({ "is-invalid": this.state.error })}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  bsSize="lg"
                  onChange={this.onInputChange}
                  className={classNames({ "is-invalid": this.state.error })}
                />
              </FormGroup>
              <div className="btn-wrap">
                <Button color="primary" onClick={this.onLoginUser}>
                  Login
                </Button>
                <LinkContainer to="/register">
                  <Button>Register</Button>
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
const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
