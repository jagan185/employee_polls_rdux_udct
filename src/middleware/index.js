import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import logger from "./logger.js";
/**
 * combine middlewares here,
 * middlewares are applied in the order they are passed to applyMiddleware
 */
export default applyMiddleware(thunk, logger);