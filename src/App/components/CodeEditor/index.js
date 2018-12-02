import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import './style.css';

class CodeEditor extends React.Component{

	onMouseDown = ({target: el}) => {
		
		let resizeYpivot = el.offsetParent.offsetTop + el.offsetTop;
		this.resizeYpivot = resizeYpivot;
		this.resizing = true;
		document.body.style.cursor = "row-resize";
		document.body.style.userSelect = "none";
	}

	onMouseUp = () => {
		if( this.resizing ){
			this.resizing = false;
			document.body.style.cursor = "auto";
			document.body.style.userSelect = "auto";
		}
	}

	onMouseOver = (evt) => {
		if(this.resizing === true){
			if( evt.clientY > this.resizeYpivot ){
				const nh = evt.clientY - this.resizeYpivot;
				if (nh + 235 <= 260)
					this.editorWrapper.style.height = 235 + nh + "px";
			}else{
				const nh = this.resizeYpivot - evt.clientY;
				this.editorWrapper.style.height = 235 - nh + "px";
			}
		}
	}

	componentDidMount(){
		document.body.addEventListener('mousemove', this.onMouseOver);
		document.body.addEventListener('mouseup', this.onMouseUp);
	}

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
				    fontSize = "16px"
				    value = {this.props.value}
				    showPrintMargin = {false}
				    wrapEnabled = {true}
				    editorProps={{$blockScrolling: true}}
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