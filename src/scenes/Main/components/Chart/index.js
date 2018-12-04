/**
 * @desc This component displays N charts
 * and their custom captions accordingly 
 * with the preprocessed value given in
 * <CodeEditor/>.
*/

import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';

import {chartDefaultOptions} from '../../../../services/Utils/chart.js';
import './style.css';

class Chart extends React.Component{

	constructor(props){
		super(props);
		this.chartRef = [];
		this.legendRef = [];
	}


	/**
	 * @desc Since ChartJS does not permite too 
	 * much customization on the captions, we 
	 * created our own custom caption.
	 * This function iterates over all ChartsJS
	 * references and for each one asks it to generate 
	 * their corresponding HTML String caption, 
	 * then we put that string int the corresponding
	 * caption box ( div.legend-wrapper ).
	 *
	 * This needs to happen every time component
	 * updates.
	*/
	componentDidUpdate(prevProps, prevState){
		for(let i = 0; i < this.chartRef.length; i++)
			if( this.chartRef[i] && this.legendRef[i] )
				this.legendRef[i].innerHTML = this.chartRef[i].chartInstance.generateLegend();
	}

	render(){

		const {eventStreamList} = this.props;

		return(
			<div className = "charts-">
				{/* Support for N charts depending on the number of start events */}
				{eventStreamList.getList().map( (v, k) => {
					
					const data = {
						datasets: v.datasets.toChartFormat()
					};
					
					return(
						<div className = "chart-wrapper" key = {k}>
							<div className = "line-chart-wrapper">
								<Line 
									data    = {data}
									width   = {600}
									height  = {265} 
									key     = {k}
									options = {chartDefaultOptions}
									ref     = {ref => this.chartRef[k] = ref}/>
							</div>
							<div 
								className   = "legend-wrapper"
								ref         = {ref => this.legendRef[k] = ref}>
							</div>
						</div>
					);

				})}
			</div>
		);
	}
};

Chart.propTypes = {
	eventStreamList: PropTypes.object.isRequired
};

export default Chart;