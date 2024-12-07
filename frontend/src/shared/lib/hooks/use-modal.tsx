import { ReactNode } from 'react'
import { modals } from '@mantine/modals'
import { ModalType } from '../config'

type Props = {
	type: ModalType
	size?: number
	title?: string
	children?: ReactNode
}

export const useModal = (props: Props) => {
	const { type, size, title, children } = props

	const handleOpen = () => {
		modals.open({
			modalId: type,
			size,
			title,
			children,
		})
	}

	const handleClose = () => {
		modals.close(type)
	}

	return {
		handleOpen,
		handleClose,
	}
}
