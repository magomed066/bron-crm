import { Combobox, Loader, TextInput, useCombobox } from '@mantine/core'
import { FC } from 'react'
import { Props } from './types'

export const AsyncAutocomplete: FC<Props> = ({
	data,
	loading,
	defaultValue,
	value,
	empty,
	label,
	placeholder,
	error,
	onSelect,
	onChange,
}) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	})

	const options = (data || []).map((item) => (
		<Combobox.Option value={item} key={item}>
			{item}
		</Combobox.Option>
	))

	return (
		<Combobox
			onOptionSubmit={(optionValue) => {
				combobox.closeDropdown()
				onSelect?.(optionValue)
			}}
			withinPortal={false}
			store={combobox}
		>
			<Combobox.Target>
				<TextInput
					label={label}
					placeholder={placeholder}
					defaultValue={defaultValue}
					value={value}
					error={error}
					onChange={(event) => {
						onChange?.(event.currentTarget.value)
						combobox.resetSelectedOption()
						combobox.openDropdown()
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => {
						combobox.openDropdown()
					}}
					onBlur={() => combobox.closeDropdown()}
					rightSection={loading && <Loader size={18} />}
				/>
			</Combobox.Target>

			<Combobox.Dropdown hidden={data === null}>
				<Combobox.Options>
					{options}
					{data?.length === 0 && !loading && empty && (
						<Combobox.Empty>No results found</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}
