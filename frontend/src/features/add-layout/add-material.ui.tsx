import { ModalType } from '@/shared/lib/config'
import { ActionIcon } from '@mantine/core'
import { FaPlus } from 'react-icons/fa'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { AddLayoutModalFeature } from '../add-layout-modal'

export const AddLayoutFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить оформление',
		type: ModalType.ADD_LAYOUT,
		children: <AddLayoutModalFeature />,
		size: 600,
	})

	return (
		<ActionIcon variant="default" size={32} color="gray" onClick={handleOpen}>
			<FaPlus />
		</ActionIcon>
	)
}
