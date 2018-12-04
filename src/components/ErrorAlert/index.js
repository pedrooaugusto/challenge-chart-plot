/**
 * @desc This component displays a informative dialog box
 * whenever one of his childs throws an error.
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function ErrorAlert(props){
	return(
		<React.Fragment>
			<div className = {`modal-overlay${props.error ? " open" : ""}`}></div>
			<div className = {`modal${props.error ? " open" : ""}`}>
				<div className = "modal-content">
					<div className = "title">An error has occurred!</div>
					<div className = "message">
						{props.error && (props.error.message)}
					</div>
					<div className = "stack-trace">
						{props.error && (props.error.stack)}
					</div>
					<div className = "btn">
						<button onClick = {props.dismiss}>Dismiss</button>
					</div>
				</div>
			</div>
			{props.children}
		</React.Fragment>
	);
};

ErrorAlert.propTypes = {
	error: PropTypes.bool.isRequired,
	dismiss: PropTypes.func.isRequired
};

export default ErrorAlert;