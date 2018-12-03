import React from 'react';
import {Line} from 'react-chartjs-2';
import {common} from './ChartOptions';
import './style.css';

class Chart extends React.Component{

	constructor(props){
		super(props);
		this.chartRef = [];
		this.legendRef = [];
	}


	/* Render custom captions for each chart */
	componentDidUpdate(prevProps, prevState){
		/* sorry about that :(  */
		for(let i = 0; i < this.chartRef.length; i++)
			if( this.chartRef[i] && this.legendRef[i] )
				this.legendRef[i].innerHTML = 
					this.chartRef[i].chartInstance.generateLegend();
	}

	render(){

		const {eventStreamList} = this.props;

		return(
			<div className = "charts-">
				{/* If there are multiple event streams we can have multiple charts */}
				{eventStreamList.getList().map( (v, k) => {
					
					const data = {
						datasets: v.datasets.toChartFormat()
					};
					
					return(

						<div className = "chart-wrapper" key = {k}>
							<div className = "line-chart-wrapper">
								<Line 
									data = {data}
									width ={600}
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