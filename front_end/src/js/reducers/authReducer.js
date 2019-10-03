import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  userEmail: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, userEmail: action.payload };
    case SIGN_OUT:
      return { ...state, userEmail: null };
    default:
      return state;
  }
};
