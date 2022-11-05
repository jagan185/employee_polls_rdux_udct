import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Authenticate from "./Authenticate.js";
import Page404 from "./Page404.js";
import { withRouter } from "../utils/util.js";
import { formatQuestion } from "../utils/util.js";
import { handleAnswer } from "../actions/questions.js";

const PreguntaView = ({ question, dispatch, id, authedUser }) => {
    const navigate = useNavigate();

    if (question === null) {
        return (
            <Page404 />
        );
    };

    const {
        name,
        avatarURL,
        optionOneText,
        optionTwoText,
        hasAnswer,
        voteSelected,
        totalVotes,
        optionOnePercent,
        optionTwoPercent,
    } = question;

    const handleClick = (answer) => {
        dispatch(handleAnswer({ authedUser,qid:id, answer }));
        navigate(`/questions/${id}`);
    };

    return (
        <div className="max-w-screen-xl m-2">
            <Authenticate />
            <span className="text-xl font-bold inline"> Question by : {name}  <img className="inline" src={avatarURL} width="25" alt="img" /> </span>
            <div>
                <h6 className="text-xl m-2 text-center font-bold">Would you rather</h6>
                {hasAnswer ? (
                    <div>
                        <span className="text-xl m-2">You have already answered this question.</span>
                        <p className="text-xl m-2">Your choice: <button className="bg-blue-400 text-black font-bold py-2 px-4 rounded" type="button" disabled>{voteSelected}</button></p>
                        <hr />
                        <h3 className="text-xl m-2 text-center font-bold">Vote Result</h3>
                        <p className="text-xl m-2">Choice one: <button className="bg-blue-200 text-black font-bold py-2 px-4 rounded m-2" type="button" disabled>{optionOneText}</button></p>
                        <p className="text-xl m-2" >Choice two: <button className="bg-blue-200 text-black font-bold py-2 px-4 rounded m-2" type="button" disabled>{optionTwoText}</button></p>
                        <table className="table-auto border border-spacing-2-px">
                            <thead>
                                <tr>
                                    <th className="border" scope="col"><p className="text-xl m-2 font-bold">Choice</p></th>
                                    <th className="border" scope="col"><p className="text-xl m-2 font-bold">%</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border"> <p className="text-xl m-2">{optionOneText}</p></td>
                                    <td className="border"> <p className="text-xl m-2">{optionOnePercent} % </p></td>
                                </tr>
                                <tr>
                                    <td className="border"> <p className="text-xl m-2">{optionTwoText} </p> </td>
                                    <td className="border"> <p className="text-xl m-2">{optionTwoPercent} % </p> </td>
                                </tr>
                                <tr>
                                    <td className="border"> <p className="text-xl m-2"> # of Votes </p></td>
                                    <td className="border"> <p className="text-xl m-2"> {totalVotes} </p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-auto">
                        <span className="text-xl m-2">Click on one of the two Choices</span>
                        <button className="bg-blue-300 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 m-2 rounded" type="button" onClick={() => handleClick('optionOne')}>{optionOneText}</button>
                        <button className="bg-blue-300 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 m-2 rounded" type="button" onClick={() => handleClick('optionTwo')}>{optionTwoText}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
    const {id} = props.router.params;
    const question = questions[id];
    return {
        authedUser,
        id,
        question: question ? formatQuestion(question, users[question.author], authedUser) : null
    };
};

PreguntaView.propTypes = {
    question : PropTypes.object,
    authedUser : PropTypes.object.isRequired,
    id : PropTypes.string.isRequired
};
export default withRouter(connect(mapStateToProps)(PreguntaView));