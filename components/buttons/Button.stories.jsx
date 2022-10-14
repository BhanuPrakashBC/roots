import React from 'react';
import { DropArrow, ViewIcon } from '../../assets/vectors/common';
import Button from './Button';

export default {
	title: 'ComponentsV2/Buttons/Button',
	component: Button,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	return <Button {...args} />;
};

export const Filled = Template.bind({});

Filled.args = {
	title: 'Button Name',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'primary',
};

Filled.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <ViewIcon height='24' width='24' color='#ffffff' />;
	},
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
	...Filled.args,
	rightComponent: () => {
		return <DropArrow active height='12' width='12' color='#ffffff' />;
	},
};

export const WithBothSideIcon = Template.bind({});
WithBothSideIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <ViewIcon height='24' width='24' color='#ffffff' />;
	},
	rightComponent: () => {
		return <DropArrow active height='12' width='12' color='#ffffff' />;
	},
};

export const WithOnlyIcon = Template.bind({});
WithOnlyIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <ViewIcon height='24' width='24' color='#ffffff' />;
	},
	title: '',
};

export const Disabled = Template.bind({});

Disabled.args = {
	title: 'Button Name',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'secondary',
	disabled: true,
};
