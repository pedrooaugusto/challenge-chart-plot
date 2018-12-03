import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import './style.css';

class CodeEditor extends React.Component{

	/* Saving the pivot before resizing takes place */
	onMouseDown = ({target: el}) => {
		
		let resizeYpivot = el.offsetParent.offsetTop + el.offsetTop;
		this.resizeYpivot = resizeYpivot;

		let codeCurrentHeight = this.editorWrapper.style.height || "235px";
		this.codeCurrentHeight = parseInt(codeCurrentHeight, 10);

		this.resizing = true;
		document.body.style.cursor = "row-resize";
		document.body.style.userSelect = "none";
	}

	/* Stops resizing */
	onMouseUp = () => {
		if( this.resizing ){
			this.resizing = false;
			document.body.style.cursor = "auto";
			document.body.style.userSelect = "auto";
		}
	}

	/* Tracking mouse movement during resizing */
	onMouseMove = (evt) => {
		if(this.resizing === true){

			const currHeight = this.codeCurrentHeight;
			
			if( evt.clientY > this.resizeYpivot ){

				const nh = evt.clientY - this.resizeYpivot;
				
				/* LIMIT: make the chart always visible */
				if (nh + currHeight <= 260)
					this.editorWrapper.style.height = currHeight + nh + "px";
			}else{
				
				const nh = this.resizeYpivot - evt.clientY;
				this.editorWrapper.style.height = currHeight - nh + "px";
			}
		}
	}

	/* Registering mouse events to be used in resize action */
	componentDidMount(){
		document.body.addEventListener('mousemove', this.onMouseMove);
		document.body.addEventListener('mouseup', this.onMouseUp);
	}

	/* Unregistering resize mouse events */
	componentWillUnmount(){
		document.body.removeEventListener('mouseup');
		document.body.removeEventListener('mousemove');
	}

	render(){
		return (
			<div 
				className = "editor-wrapper"
				ref = {el => this.editorWrapper = el}>
				<AceEditor
				    mode = "java"
				    theme = "monokai"
				    name = "custom_ace_editor"
				    width = "100%"
				    onChange = {this.props.onChange}
				    height = "100%"
				    fontSize = "15px"
				    value = {this.props.value}
				    showPrintMargin = {false}
				    wrapEnabled = {true}
				    editorProps={{$blockScrolling: true}}
					style = {{
						lineHeight: '24px'
					}}
				/>
	  			<span 
	  				className = "resize-btn"
	  				onMouseDown = {this.onMouseDown}>
	  			</span>
  			</div>
		);
	}
}

export default CodeEditor;