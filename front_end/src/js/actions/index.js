import api from "../apis";
import {
  FETCH_QUOTE,
  FETCH_ABOUT,
  FETCH_POSTS,
  FETCH_RANDOM_POSTS,
  FETCH_RANDOM_POST,
  FETCH_POST,
  FETCH_NOW,
  SIGN_IN
} from "./types";

export const signIn = () => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
      ? `token ${localStorage.getItem("token")}`
      : ""
  };
  const response = await api
    .get("/portkey", { headers: headers })
    .catch(() => null);
  dispatch({
    type: SIGN_IN,
    payload: response.data.email ? response.data.email : response.data
  });
};

export const fetchQuote = () => async dispatch => {
  const response = await api.get("/quote");
  dispatch({ type: FETCH_QUOTE, payload: response.data });
};

export const fetchAbout = () => async dispatch => {
  const response = await api.get("/posts/?about=true");
  dispatch({ type: FETCH_ABOUT, payload: response.data });
};

export const fetchNow = () => async dispatch => {
  const response = await api.get("/posts/?now=true");
  dispatch({ type: FETCH_NOW, payload: response.data });
};

export const fetchPosts = (page_num = 1) => async dispatch => {
  const response = await api.get(`/posts/?page=${page_num}`);
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = (slug, param = "") => async dispatch => {
  const response = await api.get(`/posts/${slug}/${param}`);
  dispatch({ type: FETCH_POST, payload: response.data });
};

export const fetchRandomPosts = (page_num = 1) => async dispatch => {
  const response = await api.get(`/random/?page=${page_num}`);
  dispatch({ type: FETCH_RANDOM_POSTS, payload: response.data });
};

export const fetchRandomPost = (id, param = "") => async dispatch => {
  const response = await api.get(`/random/${id}`);
  dispatch({ type: FETCH_RANDOM_POST, payload: response.data });
};
