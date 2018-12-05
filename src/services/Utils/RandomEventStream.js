/**
 * @desc This class has the power of generate
 * random event streams.
 * 
 * Not done yet :(
*/

const MAX      = 100;
const ONE_MIN  = 60 * (1000);

const CUR_DATE = new Date().getTime();
const MIN_DATE = CUR_DATE - ONE_MIN*60*2;
const MAX_DATE = CUR_DATE + ONE_MIN*60*2;

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class RandomEventStream{
	constructor(numberOfStreams = 1){
		this.numberOfStreams = numberOfStreams;
		this.maxEventsNumbers = 2 + Math.floor(Math.random() * MAX);
	}

	generate(){
		
		const list   = [];
		const string = null;
		
		for(let i = 0; i < this.numberOfStreams; i++){

			list.push( this.randomStart() );

			for(let j = 0; j < this.maxEventsNumbers; j++){

			}
		}
	}

	randomStart(){
		const timestamp   = this.randomTimestamp();
		const groupLenght = Math.random();
	}

	randomTimestamp(){
		return randomIntFromInterval(MIN_DATE, MAX_DATE);
	}

}