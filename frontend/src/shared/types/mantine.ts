import { DefaultMantineColor } from '@mantine/core'

type Colors =
	| 'primaryColor'
	| 'secondaryColor'
	| 'whiteColor'
	| 'green'
	| 'red'
	| 'gray'
	| 'none'
	| 'dark'
	| 'dimmed'

export type ExtendedCustomColors = Colors & DefaultMantineColor
