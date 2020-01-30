import { combineReducers } from 'redux';

import cart from './cart/reducer';
// import os demais reducers aqui

export default combineReducers({
  cart,
  // Acrescente os demais reducers aqui
});