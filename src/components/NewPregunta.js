import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Authenticate from "./Authenticate";
import { handleAddQuestion } from "../actions/questions";

const NewPregunta = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log({ success, error });
  }, [success, error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstOption !== '' & secondOption !== '') {
      const question = {
        optionOneText: firstOption,
        optionTwoText: secondOption
      };

      dispatch(handleAddQuestion(question));
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    };

    setFirstOption('');
    setSecondOption('');
    navigate('/');
  };

  const optionOneChange = (event) => {
    setFirstOption(event.target.value);
  };

  const optionTwoChange = (event) => {
    setSecondOption(event.target.value);
  };

  return (
    <div className="flex flex-col max-w-screen-xl ml-5 rounded overflow-hidden shadow-lg">
      <Authenticate />
      {success && (
        <div className="m-2">
          <h1 className="text-green-900 text-xl" data-testid="success-header">New Question saved successfully</h1>
        </div>
      )}
      {error && (
        <div className="m-2">
          <h1 className="text-red-900 text-xl" data-testid="error-header"> Error saving new question</h1>
        </div>  
      )}
      <div className="m-2"><h6 className="text-black text-xl text-center font-bold">Create your own poll</h6></div>
      <div className="m-2"><h1 className="text-black text-xl text-center font-bold">Would you rather</h1> </div>
      <form className="space-y-4 md:space-y-6 m-2" onSubmit={handleSubmit}>
        <div className="m-2">
          <label htmlFor="firstOptionValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Option
          </label>
          <input
            value={firstOption}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="firstOptionValue"
            placeholder="Option One"
            onChange={optionOneChange}
            data-testid="option-one-input"
            required
          />
        </div>
        <div className="m-2">
          <label htmlFor="secondOptionValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Second option
          </label>
          <input
            value={secondOption}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="secondOptionValue"
            placeholder="Option Two"
            onChange={optionTwoChange}
            data-testid="option-two-input"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 m-2 rounded"
          data-testid="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(NewPregunta);