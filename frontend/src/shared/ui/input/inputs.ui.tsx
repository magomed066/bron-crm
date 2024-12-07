import { FC } from 'react';
import clsx from 'clsx';
import { PasswordInput, TextInput } from '@mantine/core';
import { InputPasswordProps, InputTextProps } from './types';
import { inputDefaultClassNames, inputWhiteClassNames } from './config';

export const Input: FC<InputTextProps> = ({
	label,
	type = 'text',
	maxLength = 1000,
	placeholder,
	withAsterisk,
	inputClassName,
	labelClassName,
	height = 48,
	error,
	fontSize = 16,
	rounded = 'xl',
	inputVariant = 'filled',
	...rest
}) => {
	return (
		<TextInput
			fz={16}
			withAsterisk={withAsterisk}
			type={type}
			label={label}
			maxLength={maxLength}
			color="bg-fill-brand"
			height={height}
			error={error}
			placeholder={placeholder}
			classNames={{
				input: clsx(
					inputVariant === 'white' ? inputWhiteClassNames : inputDefaultClassNames,

					'h-min-[40px]',
					`rounded-${rounded}`,

					`text-[${fontSize}px]`,

					error && 'border-[#fa5252]',

					inputClassName,
				),
				label: clsx(labelClassName?.length ? labelClassName : 'text-[16px]', 'mb-2'),
			}}
			{...rest}
		/>
	);
};

export const InputPassword: FC<InputPasswordProps> = ({ label, placeholder, withAsterisk, className, ...rest }) => {
	return (
		<PasswordInput
			withAsterisk={withAsterisk}
			label={label}
			placeholder={placeholder}
			classNames={{
				input: clsx(inputDefaultClassNames, className),
				innerInput: 'pr-4 pl-4',
			}}
			{...rest}
		/>
	);
};
