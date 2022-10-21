/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../../utils';
import { BaseTable } from '../baseTable';
import { TableChips } from './tableChips';
import { TableFilters } from './tableFilters';
import { Pagination } from '../../pagination';
import styles from './Table.module.css';
import { TableColumn } from '../BaseTable.class';

const INTERSECTION = 1;
const STEP = 0.1;
const THRESHOLD = [];

for (let i = 0; i < INTERSECTION; i += STEP) {
	THRESHOLD.push(i);
}

const Table = (props) => {
	const {
		className,
		headerData,
		tableData,
		uniqueKey,
		activeData,
		setActiveData,
		customCells,
		chipsData,
		filtersData,
		paginationData,
	} = props;

	const ref = useRef(null);
	const paginationRef = useRef(null);

	const [floating, setFloating] = useState(false);
	const [hiddenColumns, setHiddenColumns] = useState({});

	const visibileColumns = headerData.filter((header) => {
		return [null, false, undefined].includes(hiddenColumns?.[header?.id]);
	});

	// for pagination docking using intersection observer
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem) {
			const lastRow = tableElem.querySelector(
				'[data-elem="table-body"] [data-elem="table-row"]:last-child'
			);
			if (lastRow) {
				const lastRowHeight = parseInt(getComputedStyle(lastRow).height.slice(0, -2), 10);
				const handleIntersect = (entries) => {
					entries.forEach((entry) => {
						// if the target is visibile
						if (
							(entry.isIntersecting && entry.intersectionRatio >= INTERSECTION) ||
							entry?.intersectionRect?.height === lastRowHeight
						) {
							setFloating(false);
						} else {
							setFloating(true);
						}
					});
				};

				const options = {
					threshold: THRESHOLD,
				};

				const observer = new IntersectionObserver(handleIntersect, options);
				observer.observe(lastRow);
			}
		}
	}, []);

	// for dynamically resizing table vertically acc to provided addons
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem) {
			const totalAddons = [chipsData, filtersData].filter(Boolean).length;
			tableElem.style.height = `calc(100% - ${totalAddons * 3}rem)`;
		}
	}, [chipsData, filtersData]);

	// setting body and header min-width to allow horizontal sticky column beyond viewport width
	useEffect(() => {
		const tableElem = ref.current;
		if (tableElem) {
			const tableHeaderElem = tableElem.querySelector('[data-elem="table-header"]');
			const tableBodyElem = tableElem.querySelector('[data-elem="table-body"]');

			if (tableHeaderElem && tableBodyElem) {
				let minWidth = 0;
				visibileColumns.forEach((header) => {
					minWidth += new TableColumn(header).sizeInRem;
				});
				tableHeaderElem.style.minWidth = `${minWidth}rem`;
				tableBodyElem.style.minWidth = `${minWidth}rem`;
			}
		}
	}, [hiddenColumns, headerData]);

	// set the hidden columns state
	useEffect(() => {
		setHiddenColumns({});
	}, [headerData]);

	return (
		<div className={classes(styles.root, className)}>
			{chipsData != null && <TableChips className={styles.chips} {...chipsData} />}
			{filtersData != null && (
				<TableFilters
					className={styles.filters}
					{...{
						...filtersData,
						headerData,
						hiddenColumns,
						setHiddenColumns,
					}}
				/>
			)}
			<BaseTable
				{...{
					ref,
					headerData: visibileColumns,
					tableData,
					uniqueKey,
					activeData,
					setActiveData,
					customCells,
					className: styles.table,
				}}
			/>

			{paginationData != null && (
				<Pagination
					className={classes(styles.pagination, floating ? styles.floating : '')}
					ref={paginationRef}
					{...paginationData}
					floating={floating}
				/>
			)}
		</div>
	);
};

Table.propTypes = {
	className: PropTypes.string,
	headerData: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			id: PropTypes.string,
			size: PropTypes.oneOf(['sm', 'md', 'lg']),
			flexible: PropTypes.bool,
			sort: PropTypes.bool,
			style: PropTypes.object,
			multiLine: PropTypes.bool,
		})
	),
	tableData: PropTypes.arrayOf(PropTypes.object),
	uniqueKey: PropTypes.arrayOf(PropTypes.string),
	activeData: PropTypes.object,
	setActiveData: PropTypes.func,
	customCells: PropTypes.shape({
		header: PropTypes.object,
		body: PropTypes.object,
	}),
	chipsData: PropTypes.shape({
		...TableChips.propTypes,
	}),
	filtersData: PropTypes.shape({
		...TableFilters.propTypes,
	}),
	paginationData: PropTypes.shape({
		...Pagination.propTypes,
	}),
};

Table.defaultProps = {
	className: '',
	headerData: [],
	tableData: [],
	uniqueKey: [],
	activeData: {},
	setActiveData: () => {},
	customCells: {
		header: null,
		body: null,
	},
	chipsData: null,
	filtersData: null,
	paginationData: null,
};

export default Table;
