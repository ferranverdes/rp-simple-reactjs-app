import { connect } from 'react-redux';
import { fetchPhrase } from '../actions';
import Phrase from './Phrase';

const mapStateToProps = ({ phrase }) => ({ phrase });

export default connect(mapStateToProps, { fetchPhrase })(Phrase);
