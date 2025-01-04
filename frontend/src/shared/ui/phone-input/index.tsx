import { IMaskInput } from 'react-imask'
import { InputBase } from '@mantine/core'
import { FC } from 'react'
import { Props } from './types'

export const PhoneInput: FC<Props> = ({
	label,
	placeholder,
	required,
	value,
	onChange,
	...rest
}) => {
	return (
		<InputBase
			label={label}
			component={IMaskInput}
			mask="+7 (000) 000-00-00"
			value={value}
			placeholder={placeholder}
			onChange={(e) => onChange?.(e.currentTarget.value)}
			required={required}
			{...rest}
		/>
	)
}
