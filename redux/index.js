import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers/Reducer';


export const initStore = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
};