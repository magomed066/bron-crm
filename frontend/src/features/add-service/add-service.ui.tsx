import { ModalType } from '@/shared/lib/config'
import { ActionIcon } from '@mantine/core'
import { FaPlus } from 'react-icons/fa'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { AddServiceModalFeature } from '../add-service-modal'

export const AddServiceFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить услугу',
		type: ModalType.ADD_SERVICE,
		children: <AddServiceModalFeature />,
		size: 600,
	})

	return (
		<ActionIcon variant="default" size={32} color="gray" onClick={handleOpen}>
			<FaPlus />
		</ActionIcon>
	)
}
