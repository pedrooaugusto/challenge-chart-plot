import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header/>
				<CodeEditor/>
				<Chart />
			</React.Fragment>
			);
		}
	}

export default App;
	