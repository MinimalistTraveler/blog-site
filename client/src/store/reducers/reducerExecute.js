import { combineReducers } from "redux";
import registerUserReducers from "./registerUserReducers";
import signInUserReducers from "./signInUserReducers";
import getUserReducers from "./getUserReducers";
import getBlogReducers from "./getBlogReducers";
import getBlogListReducers from "./getBlogListReducers";
import addBlogReducers from "./addBlogReducers";
import deleteBlogReducers from "./deleteBlogReducers";
import editBlogReducers from "./editBlogReducers";
export default combineReducers({
  registerUser: registerUserReducers,
  signInUser: signInUserReducers,
  getProfile: getUserReducers,
  getBlogStore: getBlogReducers,
  getBlogListStore: getBlogListReducers,
  addBlogStore: addBlogReducers,
  deleteBlogStore: deleteBlogReducers,
  editBlogStore: editBlogReducers
});
