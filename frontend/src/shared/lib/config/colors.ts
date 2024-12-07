import { ExtendedCustomColors } from '@/shared/types'
import { colorsTuple, MantineColorsTuple } from '@mantine/core'

export const manTineColors: Partial<
	Record<ExtendedCustomColors, MantineColorsTuple>
> = {
	primaryColor: colorsTuple('#00545c'),
	secondaryColor: colorsTuple('#525975'),
	whiteColor: colorsTuple('#fff'),
}
