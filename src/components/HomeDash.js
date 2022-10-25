/**
 * @description Home page, displays a dashboard of answered and unanswered questions
 */

import { useState } from "react";
import { connect } from "react-redux";

import Authenticate from "./Authenticate.js";
import PreguntasView from "./PreguntasView.js";

const HomeDash = ({ votedFor, notVotedFor, users }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState(false);

  const handleShow = () => {
    setAnsweredQuestions(!answeredQuestions);
  };

  return (
    <div className="flex flex-col max-w-screen-xl rounded overflow-hidden shadow-2xl m-2">
      <Authenticate />
      <div className="items-center justify-center text-center">
        <button className="items-center justify-center bg-green-300 hover:bg-green-700 text-black hover:text-white font-bold py-2 px-4 m-2 rounded" onClick={handleShow}> Show {answeredQuestions ? "Unanswered" : "Answered"} Polls</button>
      </div>
      {!answeredQuestions ? (
        <div>
          <div className="font-bold text-xl m-2 items-center justify-center text-center">
              New Questions
            </div>
            <div className="px-6 py-4">
                {notVotedFor.length ? notVotedFor.map(question => {
                  return (
                    <PreguntasView key={question.id} question={question} user={users[question.author]} id={question.id} />
                  );
                }) : ''}
            </div>
        </div>
      ) : (
        <div className="max-w-screen-xl rounded overflow-hidden shadow-2xl">
          <div className="font-bold text-xl m-2 items-center justify-center text-center">Done</div>
            <div className="px-6 py-4">
                {votedFor.length ? votedFor.map(question => {
                  return (
                    <PreguntasView key={question.id} question={question} user={users[question.author]} id={question.id} />
                  );
                }) : ''}
              </div>
            </div>
      )}
    </div>
  );
};

/**
 * 
 * @param { authedUser, questions, users } , state from store 
 * @returns  props to be used by component
 */
const mapStateToProps = ({ authedUser, questions, users }) => {
  const voteCount = Object.keys(questions).map(question => questions[question]);

  const votedFor = voteCount
    .filter(
      question =>
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const notVotedFor = voteCount
    .filter(question => !votedFor.includes(question))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questions,
    votedFor,
    notVotedFor,
    users
  };
};

export default connect(mapStateToProps)(HomeDash);