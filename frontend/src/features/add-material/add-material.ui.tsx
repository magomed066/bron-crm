import { ModalType } from '@/shared/lib/config'
import { ActionIcon } from '@mantine/core'
import { FaPlus } from 'react-icons/fa'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { AddMaterialModalFeature } from '../add-material-modal'

export const AddMaterialFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить материал',
		type: ModalType.ADD_MATERIAL,
		children: <AddMaterialModalFeature />,
		size: 600,
	})

	return (
		<ActionIcon variant="default" size={32} color="gray" onClick={handleOpen}>
			<FaPlus />
		</ActionIcon>
	)
}
