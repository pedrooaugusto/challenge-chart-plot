/**
 * @desc This class is responsable
 * for transforming a 'relaxed json'
 * string into a valid dataset array
 * accpeted by the ChartJS library.
*/

import JSON5 from 'json5';

import EventStream from './EventStream';

export default class EventStringParser{
	
	constructor(jsonEventList){

		/* Check input size */
		if( jsonEventList && jsonEventList.length > 55000 ){
			throw new Error(`This input is too large it cannot be processed at the browser.
				Max Input size: ${jsonEventList.length}, Input size: 55000`);
		}
		
		this.list 	       = [];
		this.events        = undefined;
		this.top 	       = null;
		this.jsonEventList = jsonEventList;
	}

	/**
	 * @desc Converts a raw string from ace code
	 * editor into a valid JSON string with all
	 * strings and keys between double quotes
	 * and comma between events.
	 * Then converts that new string into a js 
	 * array objects.
	 * And finally converts that array of events
	 * into a valid dataset object to be used in
	 * ChartJS.
	*/
	jsonStringToEventArray(){
		const asJsonArray     = '[' + this.jsonEventList.replace(/}\s*{/g, '},{') + ']';
		const asPlainJSObject = JSON5.parse(asJsonArray);
		this.events = asPlainJSObject;
	}

	/**
	 * @desc Processes each event informed
	 * in the input field by calling the 
	 * right routine for each one.
	 *
	 * Invalid event types are ignored.
	 * 
	 * @throws {NoOpenEventStream} if attempting to
	 * process any event without a open event stream.
	 *
	 * @throws {AlreadyOpenEventStream} if attempting to
	 * start a new event stream inside a existing one.
	 *
	 * @return {null} if everything goes fine.
	*/
	process(){

		this.jsonStringToEventArray();

		for(let evt of this.events){

			const err = this.canPerformEvent(evt);

			const {type} = evt;
			
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

	/** 
	 * @desc Check for some structure erros in 
	 * the array of events, like starting an 
	 * event of type start inside an already open
	 * event stream.
	 *
	 * @param {String} type type of the event
	 *
	 * @throws {NoOpenEventStream} if attempting to
	 * process any event without a open event stream.
	 *
	 * @throws {AlreadyOpenEventStream} if attempting to
	 * start a new event stream inside a existing one.
	 *
	 * @return {null} if everything goes fine.
	*/
	canPerformEvent({type, timestamp}){

		const noActiveEventStream = this.list.length === 0 || this.top.fineshed;

		if(!type || !timestamp)
			throw new Error(`The fields type and timestamp are required for all events.`);

		if( (type === "start" && !noActiveEventStream) )

			throw new Error(`Cannot open a event stream while the current one is not done.`);

		else if( (type === "data" || type === "span" || type === "stop") && noActiveEventStream )

			throw new Error(`Cannot procces a data, span or a stop event ` +
					 `without an open event stream.`);

		return null;
	}

	/**
	 * @desc Returns a list with all processed
	 * event stream, if theres none return a list
	 * with one empty event stream.
	 *
	 * @return {Array} list of processed event streams.
	*/
	getList(){
		if(this.list.length > 0)
			return this.list;
		return [new EventStream({})];
	}
}