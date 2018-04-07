import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

import firebase from './firebase';
import reducer from './reducers';
import initialState from './initial-state';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const middlewares = [];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(
		applyMiddleware(...middlewares),
		reactReduxFirebase(firebase),
		reduxFirestore(firebase),
		...enhancers
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
