import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import {common, commonDataset} from './ChartOptions';
import './style.css';

const dagta = {
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
			}
		],
		...commonDataset
	}]
};

class Chart extends React.Component{

	constructor(props){
		super(props);
		this.chartRef = [];
		this.legendRef = [];
	}

	componentDidMount(){
		console.log(this.chartRef);
	}

	componentDidUpdate(prevProps, prevState){
		/* sorry about that :(  */
		for(let i = 0; i < this.chartRef.length; i++)
			if( this.chartRef[i] && this.legendRef[i] )
				this.legendRef[i].innerHTML = this.chartRef[i].chartInstance.generateLegend();
	}

	render(){

		/* Render empty chart */
		if( !this.props.eventStreamList ){
			
			const data = {
				datasets: []
			};
			
			return (
				<div className = "chart-wrapper">
					<div className = "line-chart-wrapper">
						<Line 
							data = {data}
							width = {600}
							height = {265} 
							options = {common}
							ref = {chartRef => this.chartRef[0] = chartRef}/>
					</div>
					<div 
						className = "legend-wrapper"
						ref = {lg => this.legendContainer = lg}>
					</div>
				</div>
			);
		}

		const {eventStreamList: {list}} = this.props;

		return(
			<div className = "charts-">
				{list.map( (v, k) => {
					
					const data = {
						datasets: v.datasets.toChartFormat()
					};
					
					return(

						<div className = "chart-wrapper" key = {k}>
							<div className = "line-chart-wrapper">
								<Line 
									data = {data}
									height = {265} 
									key = {k}
									options = {common}
									ref = {ref => this.chartRef[k] = ref}/>
							</div>
							<div 
								className = "legend-wrapper"
								ref = {ref => this.legendRef[k] = ref}>
							</div>
						</div>
					);

				})}
			</div>
		);
	}
}

export default Chart;