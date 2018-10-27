import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlog, logoutUser, deleteBlog } from "../store/actions/actions";
import { Link } from "react-router-dom";
import "../CSS/blog.styl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteMode: false,
      targetBlogId: this.props.match.params.id,
      logout: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getBlogStore.logout !== this.state.logout) {
      this.props.logoutUser();
      this.props.history.push("/");
    }
  }
  componentWillMount() {
    const id = Number(this.props.match.params.id);
    console.log(id);
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.logoutUser();
      this.props.history.push("/");
      return;
    }
    this.props.getBlog(id);
  }
  toggleDeleteMode = () => {
    this.setState({ deleteMode: !this.state.deleteMode });
  };
  deleteBlog = () => {
    // Call the delete blog prop
    const { targetBlogId } = this.state;
    const token = localStorage.getItem("token");
    // Token Check
    if (!token) {
      this.props.logoutUser();
      return;
    }
    this.props.deleteBlog(targetBlogId);
    this.props.history.push("/");
  };
  render() {
    const { notFound, blog } = this.props.getBlogStore;
    const { deleteMode, targetBlogId } = this.state;
    const stringDate = moment(blog.datecreated).format("MM/DD/YYYY");
    return notFound ? (
      <div>
        <h1>404 Not Found</h1>
        <p>
          Sorry but, this blog doesn't exist in your profile. Try searching for
          another one.
        </p>
      </div>
    ) : (
      <div className="blog-card">
        <h1 className="blog-title">
          {blog.title} <span className="date">{stringDate} </span>
        </h1>
        <p className="blog-post">{blog.post}</p>
        <div className="blog-btn-wrap">
          <Link to="/" className="blog-btn btn-back">
            Go Back
          </Link>
          <div className="btn-position">
            <Link
              to={`/blogs/edit/${String(targetBlogId)}`}
              className="blog-btn btn-edit"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
            <button
              onClick={this.toggleDeleteMode}
              className="blog-btn btn-delete"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        {deleteMode ? (
          <div className="window">
            <div className="window-btn-wrap">
              <a
                className="window-close"
                onClick={() => this.toggleDeleteMode()}
              >
                <img src="./images/close.png" alt="close_window" />
              </a>
            </div>
            <div className="window-contents">
              <h1>Are You Sure?</h1>
              <p>
                Are you sure you want to do this? This change cannot be undone.
              </p>
            </div>
            <div className="options-btn-wrap options">
              <button onClick={() => this.deleteBlog()}>Yes</button>
              <button onClick={() => this.toggleDeleteMode()}>Nevermind</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => state;
const mapActionsToProps = {
  getBlog,
  deleteBlog,
  logoutUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Blog);
