/**
 * @description unit tests for LoginView.js
 */
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import reducer from "../reducers";
import middleware from "../middleware";
import LoginView from "../components/LoginView.js";



const store = legacy_createStore(reducer, middleware);

describe("LoginView", () => {
  it("will log in if a user is selected.", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginView />
        </Provider>
      </MemoryRouter>
    );
    
    let username = screen.getByTestId("userDropdownEle");
    fireEvent.change(username, { target: { value: "sarahedo" } });
    console.log('tst usrename : '+username);
    let submitButton = screen.getByTestId("submitBtnEle");
    fireEvent.click(submitButton); //this won't work since the onSubmit handler is on form and not the submit
    //submit the form with the selected username
    fireEvent.submit(username);
    console.log('::: elee :'+screen.getByTestId("successMsgEle"));
    expect(screen.getByTestId("successMsgEle")).toBeInTheDocument();
    expect(screen.queryByTestId("errorMsgEle")).not.toBeInTheDocument();
  });

  it("LoginView component rendered without changes should match snapshot", () => {
    let { component } = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginView />
        </Provider>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});