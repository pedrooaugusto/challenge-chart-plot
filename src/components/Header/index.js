/**
 * @desc This component renders the application Header
 * in wich is displayed the contestant name.
*/

import React from 'react';

import './style.css';

const Header = props => (
	<header className = "header-wrapper">
		<div className = "header">
			<div className = "main-text">
				{"Pedro Augusto's Challenge"}
			</div>
		</div>
	</header>	
);

export default Header;