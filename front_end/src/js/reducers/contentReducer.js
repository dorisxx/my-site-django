import {
  FETCH_QUOTE,
  FETCH_ABOUT,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_NOW,
  FETCH_RANDOM_POSTS,
  FETCH_RANDOM_POST
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
    case FETCH_ABOUT:
    case FETCH_POSTS:
    case FETCH_RANDOM_POSTS:
    case FETCH_RANDOM_POST:
    case FETCH_POST:
    case FETCH_NOW:
      return { ...action.payload };
    default:
      return state;
  }
};
