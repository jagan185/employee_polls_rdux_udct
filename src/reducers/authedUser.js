import { LOGIN_USER, LOGOUT_USER } from "../actions/authorizeUser.js";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log('login reducer, action id :: ' + action.id );
      return action.id;

    case LOGOUT_USER:
      return null;

    default:
      return state;
  };
};