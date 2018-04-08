import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import App from './App';

const mapStateToProps = ({ firestore: { data: { phrases } } }) => ({
	phrases: phrases ? phrases[Object.keys(phrases)[0]] : null
});

// Bug! [07-Apr-2018]
// La condición where no funciona correctamente para la función firestoreConnect
const enhance = compose(
	firestoreConnect(props => [{ collection: 'phrases', where: ['active', '==', true] }]),
	connect(mapStateToProps)
);

export default enhance(App);
