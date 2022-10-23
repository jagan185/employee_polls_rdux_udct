import { showLoading, hideLoading } from "react-redux-loading-bar";

import { saveAnswer, saveQuestion } from "./users.js";
import { addQuestion, addAnswer } from "../utils/api";

export const ADD_QUESTION = 'ADD_QUESTION';
export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_ANSWER = 'ADD_ANSWER';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
};

export function addQuestionAct(question) {
  return {
    type: ADD_QUESTION,
    question
  };
};

export function addAnswerAct({  authedUser,id, answer }) {
  return {
    type: ADD_ANSWER,
    id,
    answer,
    authedUser
  };
};

export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return addQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => {
      dispatch(addQuestionAct(question));
      dispatch(saveQuestion(question));
      dispatch(hideLoading());
    }).catch(e => {
      console.log('::: Exception while adding question :: in handleAddQuestion ' , e);
    });
  };
};

export function handleAnswer({authedUser, qid, answer}) {
  console.log('Enter handleAnswer :: ',qid,answer);
  return (dispatch, getState) => {
    //const { authedUserSt } = getState();
    console.log('In return dispatch handleAnswer :: ',authedUser,qid,answer);
    return addAnswer({authedUser, qid, answer}).then(() => {
      console.log('before dispatch addAnswerAct and saveAnswer, handleAnswer :: ',authedUser,qid,answer);
      dispatch(addAnswerAct({authedUser, id:qid, answer}));
      dispatch(saveAnswer({authedUser, id:qid, answer}));
    }).catch(e => {
      console.log('::: Exception while adding answer :: in handleAnswer ' , e);
    });
  };
};