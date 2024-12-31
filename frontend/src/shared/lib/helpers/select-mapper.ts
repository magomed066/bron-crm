import { ComboboxItem } from '@mantine/core'

export const mapDataForSelect = <T>(
	data: T[] = [],
	label?: keyof T,
	value?: keyof T,
): ComboboxItem[] => {
	if (data.length === 0 || !label || !value) return []

	return data.map((el) => ({
		label: String(el[label]),
		value: String(el[value]),
	}))
}
