export type Props = {
	data?: string[]
	loading?: boolean
	onLoad?: () => void
	onChange?: (value: string) => void
	onSelect?: (value: string) => void
	defaultValue?: string
	value?: string
	label?: string
	placeholder?: string
	empty?: boolean
	error?: boolean
}
