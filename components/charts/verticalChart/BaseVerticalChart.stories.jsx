import React from 'react';
import BaseVerticalChart from './BaseVerticalChart';

export default {
	title: 'ComponentsV2/Charts/VerticalChart/BaseVerticalChart',
	component: BaseVerticalChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const sampleData = {
	chartData: {
		mysql: {
			x1: 33.33,
			x2: 22.22,
			x3: 44.44,
		},
		pgsql: {
			x1: 39.53,
			x2: 46.51,
			x3: 13.95,
		},
	},
	metaData: {
		controlsApplied: {
			mysql: {
				x1: 18,
			},
			pgsql: {
				x1: 43,
			},
		},
		keyData: "{x1: 'compliant',x2: 'nonCompliant',x3: 'validate'}",
		totalControls: {
			x1: 61,
		},
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseVerticalChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '80%',
	xAxisShow: false,
	seriesData: sampleData,
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	cursor: 'default',
	seriesOption: [
		{
			stackIndex: 1,
			color: 'green',
			label: {
				show: true,
				formatter(param) {
					return param.name;
				},
			},
		},
		{
			stackIndex: 2,
			color: 'red',
			label: {
				show: false,
			},
		},
		{
			stackIndex: 3,
			color: 'gold',
			label: {
				show: false,
			},
		},
	],
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
