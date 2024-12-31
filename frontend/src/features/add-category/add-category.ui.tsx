import { ModalType } from '@/shared/lib/config'
import { ActionIcon } from '@mantine/core'
import { FaPlus } from 'react-icons/fa'
import { AddCategoryModalFeature } from '../add-category-modal'
import { useModal } from '@/shared/lib/hooks/use-modal'

export const AddCategoryFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить категорию',
		type: ModalType.ADD_CATEGORY,
		children: <AddCategoryModalFeature />,
		size: 600,
	})

	return (
		<ActionIcon variant="default" size={32} color="gray" onClick={handleOpen}>
			<FaPlus />
		</ActionIcon>
	)
}
