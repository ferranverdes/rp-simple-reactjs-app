import initialState from '../initial-state';
import { GET_RANDOM_PHRASE } from '../actions';

export default function phraseReducer(state = initialState.phrase, action) {
	switch (action.type) {
		case GET_RANDOM_PHRASE:
			return action.payload;
		default:
			return state;
	}
}
