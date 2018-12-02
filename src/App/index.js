import React, { Component } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Chart from './components/Chart';
import JSON5 from 'json5';
import * as Helpers from './helpers';
import './style.css';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			codeEditor:{
				defaultValue,
				value: defaultValue
			},
			chart: {
				eventStreamList: new Helpers.EventStreamList()
			}
		};
	}

	componentDidMount(){
		this.buttonClick();
	}

	editorOnChange = value => {

		this.setState( prevState => ({
			...prevState,
			codeEditor: {
				...prevState.CodeEditor,
				value
			}
		}));
	}

	/*
		Converts a raw string from ace code editor
		into a valid JSON string with all strings
		and keys between double quotes and comma
		between events.
	*/
	buttonClick = () => {
		
		/* get the value from ace editor */
		let {value} = this.state.codeEditor;

		/* add a comma between events and put
		   the whole string between brackets.
		   Now its a valid array! 
		*/
		value = '[' + value.replace(/}\s*{/g, '},{') + ']';

		/* Convert the 'relaxed json' string into a js object */
		let eventArray = JSON5.parse(value);

		console.log(eventArray);

		const eventStreamList = new Helpers.EventStreamList(eventArray);
		eventStreamList.process();

		console.log(eventStreamList);

		this.setState(prevState => ({
			...prevState,
			chart:{
				eventStreamList
			}
		}));
	}

	render() {
		return (
			<React.Fragment>
				
				<Header />
				
				<CodeEditor
					onChange = {this.editorOnChange}
					value = {this.state.codeEditor.value} />
				
				<Chart 
					{...this.state.chart}/>

				<footer className = "footer">
					<button 
						onClick = {this.buttonClick}>
						GENERATE CHART
					</button>
				</footer>

			</React.Fragment>
		);
	}
}

export default App;























const defaultValue = `{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
{type: 'stop', timestamp: 1519862400000}`;