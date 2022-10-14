import React from 'react';
import BaseButton from './BaseButton';
import * as BaseCellStories from '../cell/stories/BaseCell.stories';

export default {
	title: 'ComponentsV2/Buttons/BaseButton',
	component: BaseButton,
	argTypes: {
		...BaseCellStories.default.argTypes,
	},
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	return (
		<div>
			<BaseButton {...args} />
		</div>
	);
};

export const Filled = Template.bind({});

Filled.args = {
	title: 'Button Title',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'primary',
};
