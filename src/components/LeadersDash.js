/**
 * @description displays a table with users' and their stats of answered and unaswered questions in a table
 */

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Authenticate from "./Authenticate.js";

const LeadersDash = ({ users }) => {
  const userRank = users.sort((usr1, usr2) => usr2.totalScore - usr1.totalScore);
  return (
    <div className="max-w-screen-xl m-2 flex">
      <Authenticate />
      <table className="table-auto border border-spacing-2-px">
        <thead>
          <tr>
            <th scope="col" className="border text-xl m-2 font-bold">Users</th>
            <th scope="col" className="border text-xl m-2 font-bold">Answered Questions</th>
            <th scope="col" className="border text-xl m-2 font-bold">Created Questions</th>
          </tr>
        </thead>
        <tbody>
          {userRank.map(user => {
            return (
              <tr key={user.id}>
                <td className="border text-xl m-2">
                  <p className="m-2" data-testid="uName">{user.name}</p> <img className="inline pl-1" src={user.avatarURL} width="25" alt="img" />
                </td>
                <td className="border text-xl m-2">
                  <p data-testid="noOfAns">{Object.keys(user.answers).length}</p>
                </td >
                <td className="border text-xl m-2">
                <p data-testid="noOfQs">{user.questions.length}</p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const userRankList = Object.values(users);
  userRankList.map(user => (user.totalScore = Object.keys(user.answers).length + user.questions.length));

  return {
    users: userRankList
  };
};

LeadersDash.propTypes = {
  users : PropTypes.array
};
export default connect(mapStateToProps)(LeadersDash);