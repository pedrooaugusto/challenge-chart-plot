import React from 'react';
import Main from './scenes/Main';
import './style.css';

class App extends React.Component {

	render() {
		return (
			<Main {...this.props}/>
		);
	}
}

export default App;