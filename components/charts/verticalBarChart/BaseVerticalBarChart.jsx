/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
	GridComponent,
	TooltipComponent,
	TitleComponent,
	DatasetComponent,
	LegendComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';
import styles from './BaseVerticalBarChart.module.css';
import { classes } from '../../../utils';
import { Skeleton } from './Skeleton';
import { COLORS } from '../../../styles';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	LegendComponent,
	BarChart,
	CanvasRenderer,
]);

const BaseVerticalBarChart = (props) => {
	const {
		loading,
		title,
		gridContainLabel,
		gridOptions,
		xAxisShow,
		xAxisLabel,
		seriesData,
		onEvents,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		axisColor,
		splitType,
		barWidth,
		cursor,
		legend,
		tooltip,
		seriesName,
		stackCount,
		seriesOption,
		style,
		className,
		theme,
		fallback,
	} = props;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}
	const minHeightCheck = !Object.keys(seriesData?.chartData ?? 0)?.some((obj1) => {
		return seriesOption.some((obj, index) => {
			return seriesData?.chartData?.[obj1]?.[`x${index + 1}`];
		});
	})
		? 1
		: 0;

	const determineColor = (objectData, index, subIndex, key) => {
		if (seriesData?.chartData?.[key]?.[`x${index + 1}`]) {
			if (typeof (objectData?.color ?? '' ?? {}) !== 'string') {
				return new echarts.graphic.LinearGradient(
					...((objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? ''))
				);
			}
			return (objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? '');
		}
		return 'whitesmoke';
	};

	const seriesOptionObject = {
		type: 'bar',
		barWidth: stackCount ? barWidth : barWidth / stackCount,
		cursor,
		stack: stackCount,
		groupPadding: 3,
		barMinHeight: minHeightCheck,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		label: {
			color: 'black',
			position: 'outside',
			formatter(param) {
				return param.value;
			},
			show: true,
		},
		itemStyle: {
			borderRadius: [0, 2, 2, 0],
		},
		name: seriesData?.metaData?.keyData?.x1 ?? '',
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return {
				value: seriesData?.chartData?.[key]?.x1 ?? '',
			};
		}),
	};

	const generateSeries = () => {
		const minHeight = Object.keys(seriesData?.chartData ?? 0)?.some((obj1) => {
			return seriesOption.some((obj, index) => {
				return seriesData?.chartData?.[obj1]?.[`x${index + 1}`];
			});
		})
			? 0.004
			: 0;
		return seriesOption.map((objectData, index) => {
			return {
				...seriesOptionObject,
				...objectData,
				label: {
					...(seriesOptionObject?.label ?? {}),
					...(objectData?.label ?? {}),
				},

				name: seriesName(index),
				data: Object.keys(seriesData?.chartData ?? {}).map((key, subIndex) => {
					let check = true;
					if (stackCount <= 1) {
						check = seriesOption.some((obj, checkIndex) => {
							return seriesData?.chartData?.[key]?.[`x${checkIndex + 1}`];
						});
					} else {
						const stackCal = seriesOption[index].stack;
						check = seriesOption.some((series, checkNewIndex) => {
							if (series.stack === stackCal) {
								return seriesData?.chartData?.[key]?.[`x${checkNewIndex + 1}`];
							}
							return false;
						});
					}

					return {
						value: check
							? seriesData?.chartData?.[key]?.[`x${index + 1}`] ?? ''
							: minHeight,
						itemStyle: {
							color: determineColor(objectData, index, subIndex, key),
						},
						tooltip: {
							...(seriesOption[subIndex]?.tooltip ?? {}),
						},
					};
				}),
			};
		});
	};

	return (
		<EChartsReactCore
			option={{
				title: {
					text: title,
				},
				grid: {
					containLabel: gridContainLabel,
					...gridOptions,
				},
				xAxis: {
					data: Object.keys(seriesData?.chartData ?? {}),
					show: xAxisShow,
					type: 'category',
					axisTick: {
						show: false,
					},
					axisLabel: {
						...xAxisLabel,
					},
					axisLine: {
						show: xAxisShow,
						lineStyle: {
							color: theme === 'dark' ? '#757679' : COLORS.grey3,
						},
					},
				},
				legend: {
					...legend,
				},
				tooltip: {
					...tooltip,
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						show: yAxisLabelShow,
						color:
							axisColor !== ''
								? axisColor
								: theme === 'dark'
								? '#a2a4a5'
								: COLORS.grey,
					},
					splitLine: {
						show: ySplitLineShow,
						lineStyle: {
							color:
								axisColor !== ''
									? axisColor
									: theme === 'dark'
									? COLORS['dark-grey']
									: COLORS.grey5,
							type: splitType,
						},
					},
					axisLine: {
						show: yAxisLineShow,
						lineStyle: {
							color:
								axisColor !== ''
									? axisColor
									: theme === 'dark'
									? '#757679'
									: COLORS.grey3,
						},
					},
					axisTick: {
						show: yAxisTickShow,
						lineStyle: {
							color:
								axisColor !== ''
									? axisColor
									: theme === 'dark'
									? '#757679'
									: COLORS.grey3,
						},
					},
				},
				series: generateSeries(),
			}}
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseVerticalBarChart.propTypes = {
	loading: PropTypes.bool,
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	gridOptions: PropTypes.object,
	xAxisShow: PropTypes.bool,
	xAxisLabel: PropTypes.object,
	tooltip: PropTypes.object,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	onEvents: PropTypes.func,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	axisColor: PropTypes.string,
	splitType: PropTypes.string,
	barWidth: PropTypes.string,
	legend: PropTypes.object,
	seriesName: PropTypes.func,
	cursor: PropTypes.string,
	stackCount: PropTypes.number,
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

BaseVerticalBarChart.defaultProps = {
	loading: false,
	title: '',
	gridContainLabel: false,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 5,
	},
	xAxisShow: true,
	xAxisLabel: {
		show: true,
		rotate: 90,
		inside: true,
		verticalAlign: 'bottom',
		padding: [0, 0, 90, 0],
	},
	tooltip: {
		trigger: 'item',
	},
	seriesData: {},
	onEvents: () => {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: '',
	splitType: 'solid',
	barWidth: '50%',
	seriesName: () => {},
	legend: {
		show: true,
	},
	cursor: 'default',
	stackCount: 1,
	seriesOption: [
		{
			stackIndex: 1,
		},
	],
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
	theme: 'dark',
};

export default BaseVerticalBarChart;
