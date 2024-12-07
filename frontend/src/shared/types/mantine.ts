import { DefaultMantineColor } from '@mantine/core'

type Colors =
	| 'primaryColor'
	| 'secondaryColor'
	| 'whiteColor'
	| 'green'
	| 'red'
	| 'gray'
	| 'dark'

export type ExtendedCustomColors = Colors & DefaultMantineColor
