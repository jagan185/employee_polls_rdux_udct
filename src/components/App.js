//import react stuff
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingBar } from "react-redux-loading-bar";

//import js files
import { handleInitialData } from "../actions/shared.js";

//import all the components to compose the App
import NavBar from "./NavBar.js";
import LoginView from "./LoginView.js";
import Page404 from "./Page404.js"
import HomeDash from "./HomeDash.js";
import PreguntaView from "./PreguntaView.js";
import NewPregunta from "./NewPregunta.js";
import LeadersDash from "./LeadersDash.js";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);
  return (
    <Fragment>
      <LoadingBar />
      <NavBar />
      {
      <div className="max-w-screen-xl ml-5 rounded overflow-hidden shadow-lg">
        {props.loading === true ? null : (
          <Routes>

            <Route path="*" element={<Page404 />} />
            <Route path="/login" element={<LoginView />} />
            <Route exact path="/" element={<HomeDash />} />
            <Route path="/questions/:id" element={<PreguntaView />} />
            <Route path="/add" element={<NewPregunta />} />
            <Route path="/leaderboard" element={<LeadersDash />} />
          </Routes>
        )}
      </div>
     }
    </Fragment>
  );
}

const mapStateToProps = ({ questions }) => ({
  loading: questions === null
});

export default connect(mapStateToProps)(App);
