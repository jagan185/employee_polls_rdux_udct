import {render} from "@testing-library/react";
import React from "react";
import { BrowserRouter} from "react-router-dom";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "../reducers";
import middleware from "../middleware";

import Page404 from '../components/Page404.js';

const store = legacy_createStore(reducer, middleware);

describe("Page404", () => {
    it("will match snapshot", () => {
        var view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Page404/>
                </BrowserRouter>
            </Provider>);
        expect(view).toMatchSnapshot();
    });
});