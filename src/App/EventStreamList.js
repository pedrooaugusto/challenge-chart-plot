/*
	Here is where the magic happens!

	Takes a array of event streams and
	transform it into a valid dataset
	to be used int ChartJS.
*/


import {
	commonDataset as datasetOptions
} from './components/Chart/ChartOptions';

class EventStreamList{
	
	constructor(events){
		this.list 	= [];
		this.events = events;
		this.top 	= null;
	}

	/* Procces each event informed in the
	   editor.
	*/
	process(){

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

			return `Error: Cannot open a event stream while the current one is not done.`;

		else if( (type === "data" || type === "span" || type === "stop") && noActiveEventStream )

			return  `Error: Cannot procces a data, span or a stop event ` +
					 `without an open event stream.`;

		return null;
	}

	getList(){
		
		if(this.list.length > 0)
			return this.list;
		return [new EventStream({})];
	}
}

class EventStream{
	
	constructor({timestamp, type, select, group}){
		this.timestamp = timestamp;
		this.type      = type;
		this.select    = select;
		this.group     = group;
		this.datasets  = new Datasets();
		this.fineshed  = false;
		this.span 	   = null;
	}

	updateSpan({begin, end}){
		this.span = {begin, end};
	}

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

	checkBondaries({timestamp}){
		return timestamp >= this.span.begin && timestamp <= this.span.end;
	}

	getPairNameFromEvent(evt){
		return this.group.reduce((carry, el) => {
			if( evt.hasOwnProperty(el) )
				return carry + " " + evt[el];
			return carry;
		}, "");
	}

	stop(){
		this.fineshed = true;
	}
}


class Datasets{
	
	constructor(){
		this.datasets = new Map();
	}

	insert(datasetID, point){
		
		if( this.datasets.has(datasetID) )
			this.datasets.get(datasetID).data.push(point);	
		else
			this.datasets.set(datasetID, this.createDataset(point, datasetID));
	}

	createDataset(firstPoint, seriesID){
		
		const label = this.generateDatasetLabel(seriesID);
		const color = this.randomColor();

		return {
			label,
			data: [firstPoint],
			backgroundColor: color,
			borderColor: color,
			pointBorderColor: color,
			pointHoverBackgroundColor: color,
			...datasetOptions
		};
	}

	generateDatasetLabel(seriesID){
		return seriesID.replace(/_/g, ' ')
			.split(" ")
			.map(a => a[0].toUpperCase() + a.substr(1))
			.join(" ");
	}

	randomColor(){

		const r = Math.floor(Math.random()*256);
		const g = Math.floor(Math.random()*256);
		const b = Math.floor(Math.random()*256);

		return `rgb(${r}, ${g}, ${b})`;
	}

	toChartFormat(){
		return Array.from( this.datasets.values() );
	}
}

export {
	EventStreamList
}