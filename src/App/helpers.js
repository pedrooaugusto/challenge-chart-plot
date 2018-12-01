export function eventStreamToDataset(events, cb) {
	
	const eventStreams = [];

	for(let evt of events){
		
		const {type} = evt;

		const noActiveEventStream = eventStreams.length === 0 || eventStreams[0].fineshed;

		if( (type === "start" && !noActiveEventStream) ){

			return cb({
				msg: `Error: Cannot procces a data, span or a stop event ` +
					 `without an open event stream.`
			}, null);

		}else if( (type === "data" || type === "span" || type === "stop") && noActiveEventStream ){

			return cb({
				msg: `Error: Cannot open a event stream while the current one is not done.`
			}, null);
		}

		if(type === "start"){
			
			/* Adds a new event stream */
			eventStreams.unshift( createEventStream(evt) );

		}else if(type === "span"){

			/* Updates the chart visible date range */
			eventStreams[0].span = {
				begin: evt.begin,
				end: evt.end
			};

		}else if(type === "data"){

			const {begin, end} = eventStreams[0].span;
			
			/* Check chart plot boundaries */
			if(evt.timestamp <= end && evt.timestamp >= begin){

				const {select, group} = eventStreams[0];

				const groupID = group.reduce((carry, el) => {

					return evt.hasOwnProperty(el) ? carry + " " + evt[el] : carry;
				
				}, "");

				for(let s of select){
					
					if( evt.hasOwnProperty(s) ){
						
						const seriesID = (groupID + " " + s).trim();

						const point = {
							x: evt.timestamp, 
							y: evt[s]
						};
						
						if( eventStreams[0].datasets.hasOwnProperty(seriesID) )

							eventStreams[0].datasets[seriesID].data.push(point);							
						else

							eventStreams[0].datasets[seriesID] = { data: [point] };
					}
				}

			}

		}else if(type === "stop"){

			eventStreams[0].fineshed = true;
		}
	}

	return cb(null, eventStreams);
}

function createEventStream(evt){

	return {
		...evt,
		span: {
			begin: Number.MIN_SAFE_INTEGER,
			end:   Number.MAX_SAFE_INTEGER
		},
		fineshed: false,
		datasets: {},
	};
}