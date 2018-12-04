/** 
 * @desc This component renders the application Main scene. 
 * 
 * The main functionality of this scene is to plot a time line 
 * chart given a input json string.
 *
 * This main scene is composed of four big components:
 *   A <Header/> at the top,
 *   followed by a resizable <CodeEditor/>,
 *   followed by a list of <Chart />'s,
 *   and, finally, fixed at the bottom theres the <Footter/>.
 */

import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorAlert from '../../components/ErrorAlert';

import CodeEditor from './components/CodeEditor';
import Chart from './components/Chart';

import EventStringParser from '../../services/EventStringParser';
import {defaultValue} from '../../services/Utils/ace.js';

class Main extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			hasError: false,
			codeEditor:{
				defaultValue,
				value: defaultValue
			},
			chart: {
				eventStreamList: new EventStringParser()
			}
		};
	}

	/* starts the chart with a default value */
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

	/* Close ErrorModalAlert */
	dismissError = () => {
		this.setState(prev => ({
			...prev,
			hasError: false
		}));
	}

	/* onClick Generate new chart */
	buttonClick = () => {

		try{

			const {value} = this.state.codeEditor;

			const eventStreamList = new EventStringParser(value);
			
			/* some magic! */
			eventStreamList.process();

			this.setState(prevState => ({
				...prevState,
				chart:{
					eventStreamList
				}
			}));

		}catch(err){
			
			this.setState(prev => ({
				...prev,
				hasError: err
			}));

			console.log(err);
		}
	}

	render() {
		return (
			<ErrorAlert
				error = {this.state.hasError}
				dismiss = {this.dismissError}>
				
				<Header />
				
				<CodeEditor
					onChange =  {this.editorOnChange}
					{...this.state.codeEditor} />
				
				<Chart 
					{...this.state.chart}/>

				<Footer 
					buttonClick = {this.buttonClick}/>

			</ErrorAlert>
		);
	}
}

export default Main;