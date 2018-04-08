import { combineReducers } from 'redux';
import phraseReducer from './phrase';

const reducer = combineReducers({
	phrase: phraseReducer
});

export default reducer;
