import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { firestore } from '../firebase';
import Loading from './Loading';

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		margin: theme.spacing.unit * 2,
		maxWidth: 700
	})
});

class Phrase extends Component {
	state = {
		phrase: null
	};

	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.phrasesRef = firestore.collection('phrases').where('active', '==', true);
		this.unsubscribePhrases = this.phrasesRef.onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
				this.setState({
					phrase: doc.data()
				});
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribePhrases();
	}

	render() {
		const { classes } = this.props;
		const { phrase } = this.state;

		return (
			<div>
				{phrase ? (
					<Paper className={classes.root} elevation={24}>
						<Typography variant="headline" component="h3">
							{phrase.text}
						</Typography>
						<Typography align="right" variant="subheading" component="p">
							{phrase.author || 'Desconocido'}
						</Typography>
					</Paper>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default withStyles(styles)(Phrase);
