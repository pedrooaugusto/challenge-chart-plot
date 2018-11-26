import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import './style.css';

defaults.global.legend.position = 'right';
defaults.global.legend.labels.usePointStyle = true;
defaults.line.scales.yAxes = [{
	ticks: {
		display: false
	},
	gridLines:{
		drawBorder: false
	}
}];
// defaults.scale.gridLines.display = false;

defaults.line.scales.xAxes = [{
	gridLines: {
		display: false,
		drawBorder: false
	}
}];

console.log(defaults);

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Hello, Jen!',
		fill: false,
		lineTension: 0.1,
		backgroundColor: 'rgba(75,192,192,1)',
		borderColor: 'rgba(75,192,192,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: 'rgba(75,192,192,1)',
		pointBackgroundColor: '#fff',
		pointBorderWidth: 10,
		pointHoverRadius: 10,
		pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 1,
		pointRadius: 5,
		pointHitRadius: 5,
		data: [65, 59, 80, 81, 56, 55, 40],
		borderWidth: 2
	}],
	options:{
		legend:{
			position: 'right'
		},
		scales: {
    		yAxes: [{
      			gridLines: {
        			drawBorder: false,
      			},
    		}]
		},
	}
};

class Chart extends React.Component{
	render(){
		return (
			<div className = "chart-wrapper">
				<Line 
					data = {data}
					height = {300} 
					options={{maintainAspectRatio: false}}
				/>
			</div>
		);
	}
}

export default Chart;