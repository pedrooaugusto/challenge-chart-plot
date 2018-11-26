import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import './style.css';

class CodeEditor extends React.Component{
	render(){
		return (
			<div className = "editor-wrapper">
				<AceEditor
				    mode = "java"
				    theme = "monokai"
				    name = "custom_ace_editor"
				    width = "100%"
				    height = "235px"
				    fontSize = "16px"
				    showPrintMargin = {false}
				    editorProps={{blockScrolling: true}}
	  			/>
  			</div>
		);
	}
}

export default CodeEditor;