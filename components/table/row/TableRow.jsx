/* eslint-disable react/jsx-key */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { TableCell } from '../cell';
import styles from './TableRow.module.css';

const TableRow = (props) => {
	const { type, headerData, datum, selected, customCells, className, setActiveData } = props;

	return (
		<tr
			data-elem='table-row'
			className={classes(
				className,
				styles.root,
				selected ? styles.selected : '',
				styles[`${type}-row`]
			)}>
			{headerData?.map?.((item) => {
				let cellContent = null;
				if (type === 'header') {
					cellContent = item.title;
				} else if (type === 'body') {
					cellContent = datum?.[item.id];
				}

				const cellProps = {
					...props,
					...item,
					setActiveData,
					key: item.id,
					datum,
					cellContent,
					type,
				};

				const CustomCell = customCells?.[type]?.[item.id];
				if (CustomCell != null) {
					// eslint-disable-next-line react/jsx-key
					return <CustomCell {...cellProps} />;
				}

				return (
					// eslint-disable-next-line react/jsx-key
					<TableCell {...cellProps} />
				);
			})}
		</tr>
	);
};

TableRow.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(['header', 'body']),
	datum: PropTypes.object,
	customCells: PropTypes.shape({
		header: PropTypes.object,
		body: PropTypes.object,
	}),
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
	setActiveData: PropTypes.func,
	selected: PropTypes.bool,
};

TableRow.defaultProps = {
	className: '',
	type: 'body',
	datum: {},
	customCells: {
		header: null,
		body: null,
	},
	headerData: [],
	setActiveData: () => {},
	selected: false,
};

export default TableRow;
