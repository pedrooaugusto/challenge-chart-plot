/**
 * @desc This class represents a *LIST* 
 * of ChartJS dataset objects, each dataset 
 * represents one line in the chart.
*/


import { commonDatasetOptions } from '../Utils/chart.js';

export default class Datasets{
	
	constructor(){
		this.datasets = new Map();
	}

	/**
	 * @desc Creates and update the new dataset with
	 * the given point or update an already existing
	 * dataset with the given point.
	 *
	 * @param {String} datasetID dataset id to be
	 * created or updated.
	 * @param {Object} point new point to be added
	 * into the dataset.
	*/
	insert(datasetID, point){
		
		if( this.datasets.has(datasetID) )
			this.datasets.get(datasetID).data.push(point);	
		else
			this.datasets.set(datasetID, this.createDataset(point, datasetID));
	}

	/**
	 * @desc Creates a new dataset with
	 * the given point.
	 *
	 * @param {Object} firstPoint point to be added
	 * into the newly created dataset.
	 * @param {String} seriesID dataset id to be
	 * created.
	 *
	 * @return {Object} the newly created dataset
	 * with the provided ID and point.
	*/
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
			...commonDatasetOptions
		};
	}


	/**
	 * @desc Transforms the dataset id into a
	 * human readable format to be used as the
	 * dataset label.
	 * Replace all '_' with spaces and put the
	 * first letter of each word in upper 
	 * case.
	 * Ex: "ola_mundo_azul" => "Ola Mundo Azul"
	 *
	 * @param {String} seriedID dataset ID
	 * to be transformed in label format.
	 *
	 * @return {String} dataset id in human
	 * readable format.
	*/
	generateDatasetLabel(seriesID){
		return seriesID.replace(/_/g, ' ')
			.split(" ")
			.map(a => a[0].toUpperCase() + a.substr(1))
			.join(" ");
	}

	/**
	 * @desc Generates a random color to be used
	 * as the dataset color.
	 * 
	 * @return {String} random color in the rba
	 * format.
	*/
	randomColor(){

		const r = Math.floor(Math.random()*256);
		const g = Math.floor(Math.random()*256);
		const b = Math.floor(Math.random()*256);

		return `rgb(${r}, ${g}, ${b})`;
	}

	/**
	 * @desc Converts the datset Map to an Array.
	 * ChartJS only accepts arrays.
	 *
	 * @return {Array<Object>} datasets as an array.
	*/
	toChartFormat(){
		return Array.from( this.datasets.values() );
	}
}