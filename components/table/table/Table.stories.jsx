import React from 'react';
import { AwsCloudIcon, GcpCloudIcon } from '../../../assets/vectors/cloud';
import { DbTechIcon } from '../../../assets/vectors/common';
import { usePagination } from '../../pagination';
import { TableColumn } from '../BaseTable.class';
import Table from './Table';
import { TableChip } from './tableChips';

export default {
	title: 'ComponentsV2/Table/Table',
	component: Table,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	const [paginationState, paginationDispatch] = usePagination({
		totalPages: 20,
		currentPage: 1,
	});

	return (
		<div>
			<Table
				{...args}
				paginationData={{
					paginationState,
					paginationDispatch,
				}}
			/>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'lg',
			flexible: true,
		}),
		new TableColumn({
			title: 'Description',
			id: 'description',
			size: 'lg',
			flexible: true,
			multiLine: true,
		}),
		new TableColumn({
			title: 'Gender',
			id: 'gender',
			size: 'sm',
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
	tableData: [
		{
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',

			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
	],
	chipsData: {
		showBack: true,
		chips: [
			new TableChip({
				key: 'something',
				icon: DbTechIcon,
				label: 'DB Tech',
				value: 'PgSQL',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: DbTechIcon,
				label: 'DB Tech',
				value: 'MySQL',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: (iconProps) => {
					return <GcpCloudIcon {...iconProps} />;
				},
				label: 'Cloud',
				value: 'Google',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: (iconProps) => {
					return <AwsCloudIcon {...iconProps} />;
				},
				label: 'Cloud',
				value: 'Amazon',
				disabled: true,
			}),
		],
	},
	filtersData: {
		filterValue: {
			applied: 4,
		},
	},
};

Default.parameters = {};
