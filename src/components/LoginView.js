import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../actions/authorizeUser.js";

const LoginView = ({ userIds, users, dispatch }) => {
  const [optionSelected, setOptionSelected] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    event.preventDefault();
    setOptionSelected(event.target.value);

    if (event.target.value !== "" && event.target.value !== "none") {
      dispatch(login(event.target.value));
      navigate(location?.state?.location);
    } else if (event.target.value === "none") {
      dispatch(login(""));
      navigate("/login");
    }
  };

  /**
   * @description mostly used to test the login functionality, onchange actullay logs in and navigates too
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitedd:::");
    setSuccess(true);
    setError(false);
    //navigate("/");
  };

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="container py-12 px-6 h-full">
        {success && <h1 data-testid="successMsgEle">Logged In!!</h1>}
        {error && (
          <h1 data-testid="errorMsgEle">
            Couldn't log in, select a user.
          </h1>
        )}
        <div className="flex justify-center items-center flex-wrap g-6 text-gray-800" key="flexDiv234r">

          <div className="lg:flex lg:flex-wrap g-0" key="formDiv23423">

            <form onSubmit={handleSubmit} key="formItem23423">
              <p className="mb-4">Please login to your account</p>
              <div className="mb-4" key="selectDiv32423">
                <select
                  name="users"
                  onChange={handleChange}
                  data-testid="userDropdownEle"
                  className="form-select mt-3"
                  defaultValue={optionSelected}
                  aria-label="Default select example"
                  key="selectItem2343"
                >
                  <option value="none" key="noneOption324333"></option>
                  {userIds.map((id) => {
                    return (
                        <option value={id} key={id}>
                          {users[id].name}
                        </option>
                    );
                  })}
                  ;
                </select>
              </div>
              <div className="text-center pt-1 mb-12 pb-1">
                <button
                  className="inline-block px-6 py-2.5 hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  data-testid="submitBtnEle"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  const users = state.users;

  return {
    userIds: Object.keys(users),
    users,
  };
};

export default connect(mapStateToProps)(LoginView);
