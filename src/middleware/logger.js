/**
 * logger is a function that takes store as input and returns a function that takes next as input and returns a function that takes action as input logs action and calls next function passing in action, which returns result, this result is returned by logger
 * @param {*} store 
 * @returns 
 */
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("action :: ", action);
    const result = next(action);
    console.log("state from store :: ", store.getState());
    console.groupEnd();
    return result;
  };

  export default logger;