/**
 * @description checks for a logged in user and redirects to /login page 
 *              place this component in every component which needs to be authenticated
 */

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Authenticate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  /*
   * on load navigate to login page if not yet logged in
   */
  useEffect(() => {
    const hasLoggedIn = props.hasLoggedIn;

    if (!hasLoggedIn) {
      navigate('/login', { state: { location: location.pathname } });
    };
  }, [props.hasLoggedIn, location?.pathname, navigate]);
};

const mapStateToProps = ({ authedUser }) => {
  return {
    hasLoggedIn : authedUser === null ? false : true
  };
};

export default connect(mapStateToProps)(Authenticate);