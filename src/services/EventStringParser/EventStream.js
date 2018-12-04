/**
 * @desc This class represents an EventStream,
 * an event stream is a series of related events.
 * An event stream has three main fields:
 *   1. Select
 *		Variables that could be plotted in the chart.
 *		It's usaly a numeric value.
 *	2. Group
 *		A way of spliting the same variable in
 *		diferent series
 *	3. Span
 *		Determine which events should be ignored 
*/

import Datasets from './Datasets';

export default class EventStream{
	
	constructor({timestamp, type, select, group}){
		this.timestamp = timestamp;
		this.type      = type;
		this.select    = select;
		this.group     = group;
		this.datasets  = new Datasets();
		this.fineshed  = false;
		this.span 	   = {
			begin: new Date(0).getTime(), 
			end:   new Date().getTime()
		};
	}

	/**
	 * @desc Updates the span field or which
	 * events should be ignored depending on
	 * their timestamps.
	 *
	 * @param {Object} span object containing
	 * the values for begin and end timestamps.
	*/
	updateSpan({begin, end}){
		this.span = {begin, end};
	}

	/**
	 * @desc Procces an event of type data. 
	 * Creating or updating the corresponding
	 * datasets.
	 * If the event timestamp is not in the
	 * boundaries defined in span it gets ignored.
	 * 
	 * @param {Object} evt data event to be
	 * processed.
	*/
	updateDataset(evt){
		
		if( !this.checkBondaries(evt) )
			return;

		const pairName = this.getPairNameFromEvent(evt);

		for(let variable of this.select){
			
			if ( !evt.hasOwnProperty(variable) )
				continue;

			const seriesID = (pairName + " " + variable).trim();

			const point = {
				x: 10800000 + (evt.timestamp - this.span.begin), 
				y: evt[variable]
			};

			this.datasets.insert(seriesID, point);
		}
	}

	/**
	 * @desc Check if a event timestamp is 
	 * within the boundaries defined in span
	 *
	 * @param {Object} timestamp event timestamp
	 * to be checked.
	 *
	 * @return {Boolean} true if the timestamp
	 * is within the boundaries and false if its
	 * not.
	*/
	checkBondaries({timestamp}){
		return timestamp >= this.span.begin && timestamp <= this.span.end;
	}

	/**
	 * @desc Transform the group variables 
	 * specifieds in this event in a single string
	 * to later be used as part of the dataset
	 * label.
	 *
	 * @param {Object} Event of type data
	 *
	 * @return {String} Group variables of this
	 * event merged into a single string.
	*/
	getPairNameFromEvent(evt){
		return this.group.reduce((carry, el) => {
			if( evt.hasOwnProperty(el) )
				return carry + " " + evt[el];
			return carry;
		}, "");
	}

	/**
	 * @desc Stops the event stream, no more events 
	 * are allowed.
	*/
	stop(){
		this.fineshed = true;
	}
}