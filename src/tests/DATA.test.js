/**
 * @description unit tests for _DATA.js
 */
import {_saveQuestionAnswer, _saveQuestion} from "../utils/_DATA.js";

//it takes more time to test async methods
jest.setTimeout(4000);


/**
 * @description unit tests for _saveQuestion()
 */
describe("_saveQuestion", () => {
    it("expected to return a new formatted question", async () => {
        const optionOneText = "Play FIFA";
        const optionTwoText = "Smoke SISHA";
        const author = 'zoshikanlu';
        
        const res = await _saveQuestion({
            optionOneText: optionOneText,
            optionTwoText: optionTwoText,
            author: author,
        });
        const question = {
            "id": res.id,
            "timestamp": res.timestamp,
            "author": author,
            "optionOne": {
              votes: [],
              text: optionOneText,
            },
            "optionTwo": {
              votes: [],
              text: optionTwoText,
            },
        };
        expect(res).toEqual(question);
    });

    it("expected to return error and reject", async () => {
        const res = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: 'Smoke SISHA',
            author: 'zoshikanlu',
        }).catch(e => e);
        expect(res).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});

/**
 * @description unit test for _saveQuestionAnswer()
 */
describe("_saveQuestionAnswer", () => {
    it("expected to return true", async () => {
        const res = await _saveQuestionAnswer({
            authedUser: "mtsamis",
            qid: "vthrdm985a262al8qx3do",
            answer: "optionTwo"
        });
        expect(res).toBeTruthy();
    });

    it("expected to return error and reject", async () => {
        const res = await _saveQuestionAnswer({
            authedUser: "zoshikanlu",
            qid: undefined,
            answer: "optionTwo"
        }).catch(e => e);
        expect(res).toBe("Please provide authedUser, qid, and answer");
    });
});