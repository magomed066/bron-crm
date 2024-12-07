import { Drawer } from '@mantine/core'
import { FC } from 'react'
import { Props } from './types'

export const CustomDrawer: FC<Props> = ({
	children,
	title,
	opened,
	onClose,
}) => {
	return (
		<Drawer
			opened={opened}
			onClose={onClose}
			title={title}
			miw={320}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
		>
			{children}
		</Drawer>
	)
}
