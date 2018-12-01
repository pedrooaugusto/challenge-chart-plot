import React from 'react';
import './style.css';

class Header extends React.Component{
	render(){
		return (
			<header className = "header-wrapper">
				<div className = "header">
					<div className = "main-text">
						Pedro Augusto's Challenge
					</div>
				</div>
			</header>
		);
	}
}

export default Header;