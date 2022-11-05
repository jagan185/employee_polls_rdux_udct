import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Authenticate from "./Authenticate.js";
import { formatDate } from "../utils/util.js";

const PreguntasView = ({ question, user, id }) => {
  return (
    <div className="max-w-screen-xl">
      <Authenticate />
      <div className="max-w-screen-xl rounded overflow-hidden shadow-lg m-2">
        <div className="px-6 py-4">
          <h5 className="text-xl m-2">{user.name}</h5>
          <p className="text-xl m-2">{formatDate(question.timestamp)}</p>
        </div>
        <div className="px-6 pt-4 pb-2 text-gray m-2">
          <Link to={`/questions/${id}`} className="bg-cyan-300 hover:bg-cyan-700 text-black hover:text-white font-bold py-2 px-4 m-2 rounded">Show</Link>
        </div>
      </div>
    </div>
  );
};

PreguntasView.propTypes = {
  question : PropTypes.object,
  user : PropTypes.object.isRequired
};
export default PreguntasView;