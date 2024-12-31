import { IMaskInput } from 'react-imask'
import { InputBase } from '@mantine/core'
import { FC } from 'react'
import { Props } from './types'

export const PhoneInput: FC<Props> = ({
	label,
	placeholder,
	required,
	...rest
}) => {
	return (
		<InputBase
			label={label}
			component={IMaskInput}
			mask="+7 (000) 000-00-00"
			placeholder={placeholder}
			required={required}
			{...rest}
		/>
	)
}
