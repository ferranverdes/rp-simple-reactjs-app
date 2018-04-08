import { firestore } from '../firebase';
import { getRandomNumber } from '../utils';

export const GET_RANDOM_PHRASE = 'GET_RANDOM_PHRASE';

const phrasesRef = firestore.collection('phrases');

export const fetchPhrase = () => dispatch =>
	phrasesRef
		.where('validated', '==', true)
		.get()
		.then(snapshot => {
			const queryDocumentSnapshot = snapshot.docs[getRandomNumber(snapshot.size)];

			dispatch({
				type: GET_RANDOM_PHRASE,
				payload: queryDocumentSnapshot.data()
			});
		});
