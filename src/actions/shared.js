import { showLoading, hideLoading } from "react-redux-loading-bar";

import { getUsers } from "./users.js";
import { getQuestions } from "./questions.js";
import { getInitialData } from "../utils/api.js";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    console.log('loading.....');

    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(hideLoading());
      console.log('just after init :: ',users,questions);
    });
  };
};