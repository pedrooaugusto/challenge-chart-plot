export const common = {
	legend:{
		position: 'right',
		labels:{
			usePointStyle: true
		}
	},
	legend: false,
	legendCallbackd: function (chart) {
		return "<p>dff</p>";
	},
	scales:{
		yAxes: [{
			ticks: {
				display: false,
				maxTicksLimit: 5
			},
			gridLines: {
				drawBorder: false,
				lineWidth: 0.9,
				color: "rgba(0,0,0,0.4)",
				tickMarkLength: 15,
				zeroLineWidth: 2,
				zeroLineColor: "rgba(0,0,0,0.5)"					
			}
		}],
		xAxes: [{
			type: 'time',
			time: {
				unit: 'minute',
				displayFormats:{
					minute: 'hh:mm'
				}
			},
			gridLines: {
				display: false,
				drawBorder: false,
				tickMarkLength: 15,
			},
			ticks:{
				display: true,
			}
		}]
	},
	maintainAspectRatio: false, 
	layout: {
		padding:{
	    	left: 0,
        	right: 0,
        	top: 10,
         	bottom: 0
        }
    }
}

export const commonDataset = {
	fill: false,
	lineTension: 0.1,
	borderCapStyle: 'butt',
	borderDash: [],
	borderDashOffset: 0.0,
	borderJoinStyle: 'miter',
	pointBorderWidth: 8,
	pointHoverRadius: 8,
	pointHoverBorderWidth: 0.1,
	pointRadius: 4,
	pointHitRadius: 4,
	borderWidth: 2,	
}