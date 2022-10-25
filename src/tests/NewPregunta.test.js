/**
 * @description unit tests for NewPregunta.js
 */
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import reducer from "../reducers";
import middleware from "../middleware";
import NewPregunta from "../components/NewPregunta.js";

const store = legacy_createStore(reducer, middleware);

describe("NewPregunta", () => {
  it("will save new question.", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPregunta />
        </Provider>
      </MemoryRouter>
    );

    let choice1 = screen.getByTestId("choice1Txt");
    fireEvent.change(choice1, { target: { value: "Play FIFA" } });
    let choice2 = screen.getByTestId("choice2Txt");
    fireEvent.change(choice2, { target: { value: "Smoke SISHA" } });
    fireEvent.submit(choice1,choice2);
    expect(screen.getByTestId("successMsg")).toBeInTheDocument();
    expect(screen.queryByTestId("errorMsg")).not.toBeInTheDocument();
  });

  it("should match snapshot", () => {
    let { component } = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPregunta />
        </Provider>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});