/**
 * @description unit tests for LeaderDash.js
 */
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import { legacy_createStore } from "redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";

import  reducer  from "../reducers";
import  middleware  from "../middleware";
import {getUsers} from "../actions/users.js";

import LeadersDash from "../components/LeadersDash.js";

const store = legacy_createStore(reducer, middleware);

describe("LeadersDash", () => {
    it("will display the right number of questions and answeres for the user", () => {
        let users = {
            sarahedo: {
              id: 'sarahedo',
              password:'password123',
              name: 'Sarah Edo',
              answers: {
                "8xf0y6ziyjabvozdd253nd": 'optionOne',
                "6ni6ok3ym7mf1p33lnez": 'optionOne',
                "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                "loxhs1bqm25b708cmbf3g": 'optionTwo'
              },
              questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
            }}
        store.dispatch(getUsers(users));

        const view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LeadersDash/>
                </BrowserRouter>
            </Provider>
        );

        const userName= screen.getByTestId("uName");
        const numOfQs = screen.getByTestId("noOfQs");
        const numOfAns = screen.getByTestId("noOfAns")
        expect(userName.textContent).toBe("Sarah Edo");
        expect(numOfQs.textContent).toBe('2');
        expect(numOfAns.textContent).toBe('4');

    });
});