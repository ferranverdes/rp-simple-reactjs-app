import firebase from 'firebase';

// Required for side-effects
require('firebase/firestore');

const config = {
	apiKey: 'AIzaSyDFkowAARi8G7VZZCsPf59hk0uv8nxTmTM',
	authDomain: 'unavezdijounsabio.firebaseapp.com',
	databaseURL: 'https://unavezdijounsabio.firebaseio.com',
	projectId: 'unavezdijounsabio',
	storageBucket: 'unavezdijounsabio.appspot.com',
	messagingSenderId: '724833094296'
};

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
