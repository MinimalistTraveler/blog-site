import React, { Component } from "react";
import { Grid } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { getUser, logoutUser, getBlogList } from "../store/actions/actions";
import "../CSS/home.css";
import { LinkContainer } from "react-router-bootstrap";
import _ from "underscore.string";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      blogs: [],
      noBlogs: null
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.props.getUser(token);
    this.props.getBlogList(token);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getProfile.user !== this.state.user) {
      this.setState({ user: nextProps.getProfile.user });
    }
    if (nextProps.getBlogListStore.noBlogs !== this.state.noBlogs) {
      this.setState({ noBlogs: nextProps.getBlogListStore.noBlogs });
    }
    if (this.state.blogs !== nextProps.getBlogListStore.blogList) {
      this.setState({ blogs: nextProps.getBlogListStore.blogList });
    }
    if (nextProps.getProfile.error) {
      this.props.history.push("/");
      this.props.logoutUser();
    }
  }

  render() {
    const { user, noBlogs, blogs } = this.state;
    return (
      <React.Fragment>
        {console.log(blogs)}
        <span className="main-panel" />
        <Grid fluid>
          <div className="blog-main">
            <div className="profile-container">
              <div className="profile-panel mx-auto text-center">
                <h1>Hi</h1>
                <h2>Welcome {user ? user.username : null}!</h2>
                <p>Here are a list of your blog posts!</p>
                {!noBlogs ? (
                  <LinkContainer to="/blogs/new">
                    <Button color="primary" className="btn-block w-50 mx-auto">
                      Create Blog
                    </Button>
                  </LinkContainer>
                ) : null}
              </div>
            </div>
            {noBlogs ? (
              <div className="blog-create">
                <h2>Hmmm...looks like you haven't created a blog yet.</h2>
                <p>So what are you waiting for? Start your first blog now!</p>
                <LinkContainer to="/blogs/new">
                  <Button color="primary" className="btn-block w-50 mx-auto">
                    Create Blog
                  </Button>
                </LinkContainer>
              </div>
            ) : (
              blogs.map((blog, i) => (
                <div className="blog-container" key={i}>
                  <h1 className="blog-title">{blog.title}</h1>
                  <p>{_.prune(blog.post, 500, " ...")}</p>
                  <div className="btn-blog-container">
                    <Link to={`/blog/${blog.blogid}`} className="btn-blog">
                      Visit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => state;
const mapActionToProps = {
  getUser,
  logoutUser,
  getBlogList
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(Home);
