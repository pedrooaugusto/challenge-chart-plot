import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import {common, commonDataset} from './ChartOptions';
import './style.css';

const data = {
	datasets: [{
		label: 'Chrome on Iphone Max Time',
		backgroundColor: 'rgba(75,192,192,1)',
		borderColor: 'rgba(75,192,192,1)',
		pointBorderColor: 'rgba(75,192,192,1)',
		pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		data: [
			{
				x: 60000,
				y: 2
			},
			{
				x: 90000,
				y: 1.5
			},
			{
				x: 100000,
				y: 1.75
			},
			{
				x: 120000,
				y: 0.8
			},
			{
				x: 130000,
				y: 1
			},
			{
				x: 240000,
				y: 0.5
			},
		],
		...commonDataset
	}]
};

class Chart extends React.Component{
	render(){
		return (
			<div className = "chart-wrapper">
				<Line 
					data = {data}
					height = {300} 
					options = {common}/>
			</div>
		);
	}
}

export default Chart;