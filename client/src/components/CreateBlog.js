import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Grid, Row, Col } from "react-flexbox-grid";
import "../CSS/createblog.css";
import { addBlog, logoutUser } from "../store/actions/actions";
import { connect } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      error: this.props.addBlogStore.error,
      notLoggedIn: this.props.addBlogStore.notLoggedIn,
      success: this.props.addBlogStore.addSuccess
    };
  }
  onAddSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;
    // Validate Title and Body
    if (title === "" || body === "" || title.match(/^\s+/)) {
      console.log(title, body);
      this.setState({ error: true });
      return;
    }
    this.props.addBlog(title, body);
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.error !== nextProps.addBlogStore.error) {
      this.setState({ error: nextProps.addBlogStore.error });
    }
    if (this.state.notLoggedIn !== nextProps.addBlogStore.notLoggedIn) {
      this.setState({ notLoggedIn: nextProps.addBlogStore.notLoggedIn });
      this.props.logoutUser();
      this.props.history.push("/");
    }
    if (this.state.success !== nextProps.addBlogStore.addSuccess) {
      this.setState({
        title: "",
        body: "",
        success: nextProps.addBlogStore.addSuccess
      });
      document.getElementById("blog-title").value = "";
      document.getElementById("blog-body").value = "";
      this.props.history.push("/");
    }
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <span className="title-panel" />
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} lg={10}>
              <Form style={{ margin: "10px" }}>
                {error ? (
                  <div>
                    <p className="text-danger">
                      Looks like we can't create your blog. Make sure you filled
                      in everything before submitting.
                    </p>
                  </div>
                ) : null}
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    id="blog-title"
                    name="title"
                    onChange={this.onInputChange}
                    className={classNames({ "is-invalid": error })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Post</Label>
                  <Input
                    id="blog-body"
                    type="textarea"
                    name="body"
                    onChange={this.onInputChange}
                    className={classNames({ "is-invalid": error })}
                  />
                </FormGroup>
                <button
                  onClick={this.onAddSubmit}
                  className="btn btn-primary btn-block"
                >
                  Submit
                </button>
                <Link to="/" className="btn btn-info btn-block">
                  Go Back
                </Link>
              </Form>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapActionToProps = {
  addBlog,
  logoutUser
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(CreateBlog);

// TODO: FIX CREATE BLOG
