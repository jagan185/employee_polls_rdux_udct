export const GET_USERS = 'GET_USERS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
};

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
};

export function saveAnswer({  authedUser, id, answer }) {
  return {
    type: SAVE_ANSWER,
    id,
    answer,
    authedUser
  };
};