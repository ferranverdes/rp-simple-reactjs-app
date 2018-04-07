import React, { Component } from 'react';

import { firestore } from '../firebase';

const phrasesRef = firestore.collection('phrases');

class App extends Component {
	state = {
		phrase: null
	};

	componentDidMount() {
		phrasesRef.where('active', '==', true).onSnapshot(snapshot => {
			console.log('snap');
		});
	}

	render() {
		const { phrases } = this.props;

		console.log('render');
		console.log(phrases);

		return <div>{phrases ? 'Yes' : 'Loading...'}</div>;
	}
}

export default App;
