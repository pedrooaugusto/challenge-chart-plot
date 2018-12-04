/*
	Here is where the magic happens!

	Takes a array of event streams and
	transform it into a valid dataset
	to be used int ChartJS.
*/

import JSON5 from 'json5';

import EventStream from './EventStream';

export default class EventStringParser{
	
	constructor(jsonEventList){
		this.list 	       = [];
		this.events        = undefined;
		this.top 	       = null;
		this.jsonEventList = jsonEventList;
	}

	/*
		Converts a raw string from ace code editor
		into a valid JSON string with all strings
		and keys between double quotes and comma
		between events.

		Then converts that new string into
		js array of events.

		And finally converts that array of events
		into a valid dataset object to be used in
		ChartJS.
	*/
	jsonStringToEventArray(){
		const asJsonArray     = '[' + this.jsonEventList.replace(/}\s*{/g, '},{') + ']';
		const asPlainJSObject = JSON5.parse(asJsonArray);
		this.events = asPlainJSObject;
	}

	/* Procces each event informed in the
	   editor.
	*/
	process(){
		
		this.jsonStringToEventArray();

		for(let evt of this.events){

			const {type} = evt;

			const err = this.canPerformEvent(type);
			
			if(err){
				this.list = [];
				return err;
			}

			switch(type){
			
				case 'start':
					this.list.unshift( new EventStream(evt) );
					this.top = this.list[0];
				break;

				
				case 'span':
					this.top.updateSpan(evt);
				break;

				
				case 'data':
					this.top.updateDataset(evt);
				break;

				
				case 'stop':
					this.top.stop();
				break;

				
				default:
					console.log('Warning: Invalid event type: '+type);
			}

		}

		return null;
	}

	/* Checking for some crazy situations */
	canPerformEvent(type){

		const noActiveEventStream = this.list.length === 0 || this.top.fineshed;

		if( (type === "start" && !noActiveEventStream) )

			throw new Error(`Cannot open a event stream while the current one is not done.`);

		else if( (type === "data" || type === "span" || type === "stop") && noActiveEventStream )

			throw new Error(`Cannot procces a data, span or a stop event ` +
					 `without an open event stream.`);

		return null;
	}

	getList(){
		
		if(this.list.length > 0)
			return this.list;
		return [new EventStream({})];
	}
}