import React from 'react';
import TableRow from './TableRow';
import { TableColumn } from '../BaseTable.class';

export default {
	title: 'ComponentsV2/Table/Row',
	component: TableRow,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Container for table rows of table body',
	},
};

const Template = (args) => {
	return (
		<div>
			<TableRow {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	datum: {
		name: 'Jaidev Singh Bhui',
		age: 23,
		designation: 'UI Engineer',
		state: 'Delhi',
	},
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'lg',
		}),
		new TableColumn({
			title: 'Age',
			id: 'age',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Designation',
			id: 'designation',
		}),
		new TableColumn({
			title: 'State',
			id: 'state',
			size: 'sm',
		}),
	],
};

Default.parameters = {};
