import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Form, FormGroup, Label, Input } from "reactstrap";
import classNames from "classnames";
import "../CSS/editblog.css";
import { connect } from "react-redux";
import { editBlog, getBlog } from "../store/actions/actions";
class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      error: props.editBlogStore.error,
      success: props.editBlogStore.success
    };
  }
  onInputChange = e => this.setState({ [e.target.name]: e.target.value });
  onEditSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;
    const id = this.props.match.params.id;
    if (title !== "" || body !== "") {
      console.log("Changes submitted successfully");
      // TODO: EDIT BLOG
      return this.props.editBlog(id, title, body);
    } else {
      console.error("Fill something out!");
      return;
    }
  };
  componentWillMount() {
    this.props.getBlog(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const { error, success } = this.state;
    console.log(this.state);
    if (error !== nextProps.editBlogStore.error) {
      this.setState({ error: nextProps.editBlogStore.error });
    }
    if (success !== nextProps.editBlogStore.editSuccess) {
      this.setState({ success: nextProps.editBlogStore.editSuccess });

      this.props.getBlog(this.props.match.params.id);
      setTimeout(() => {
        this.setState({ success: false });
      }, 5000);
    }
    if (this.state.title !== nextProps.getBlogStore.blog.title) {
      this.setState({
        title: nextProps.getBlogStore.blog.title,
        body: nextProps.getBlogStore.blog.post
      });
    }
  }
  render() {
    const { error, title, body, success } = this.state;
    return (
      <React.Fragment>
        <span className="edit-panel" />
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} lg={10}>
              <Form style={{ margin: "10px" }}>
                {error ? (
                  <div>
                    <p className="text-danger">
                      We cannot update your blog. Make sure what you entered is
                      valid.
                    </p>
                  </div>
                ) : null}
                {success ? (
                  <div>
                    <p className="text-success">
                      Congrats! Your blog is successfully updated!
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
                    value={title || ""}
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
                    value={body || ""}
                  />
                </FormGroup>
                <button
                  className="btn btn-warning btn-block"
                  onClick={this.onEditSubmit}
                >
                  Edit
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
const mapActionsToProps = {
  editBlog,
  getBlog
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditBlog);
