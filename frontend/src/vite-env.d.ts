/// <reference types="vite/client" />

import { MantineColorsTuple } from '@mantine/core'
import { ExtendedCustomColors } from './shared/types'
declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, MantineColorsTuple>
	}
}
