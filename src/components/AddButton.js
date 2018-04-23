import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	}
});

const AddButton = ({ classes, classNames, handleClick }) => (
	<Button
		className={classnames(classes.button, classNames)}
		color="secondary"
		variant="fab"
		onClick={handleClick}
	>
		<AddIcon />
	</Button>
);

AddButton.propTypes = {
	classes: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AddButton);
