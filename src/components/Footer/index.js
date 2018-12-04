/**
 * @desc This component renders a fixed footer 
 * at the bottom of the page.
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Footer = props => (	
	<footer className = "footer">
		<button 
			onClick = {props.buttonClick}>
			GENERATE CHART
		</button>
	</footer>
);

Footer.propTypes = {
	buttonClick: PropTypes.func.isRequired
};

export default Footer;