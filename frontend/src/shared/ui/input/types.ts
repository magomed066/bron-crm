import { PasswordInputProps, TextInputProps } from '@mantine/core';
import { ReactNode } from 'react';

export type InputTextProps = TextInputProps & {
	inputClassName?: string;
	labelClassName?: string;
	inputVariant?: 'filled' | 'white';
	component?: ReactNode;
	fontSize?: number;
	rounded?: 'xl' | 'md' | 'lg' | 'sm';
};

export type InputPasswordProps = PasswordInputProps;
