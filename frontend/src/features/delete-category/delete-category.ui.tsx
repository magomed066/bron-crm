import { ActionIcon, Text } from '@mantine/core'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Props } from './types'
import { ModalType } from '@/shared/lib/config'
import { modals } from '@mantine/modals'
import { useDeleteCategory } from '@/entities/categories'
import { notifications } from '@mantine/notifications'

export const DeleteCategoryFeature: FC<Props> = ({ categoryId }) => {
	const { mutate } = useDeleteCategory(() => {
		notifications.show({
			color: 'green',
			autoClose: 2500,
			title: 'Категории',
			message: 'Категория успешно удалена',
		})
	})

	const handleConfirm = () => {
		if (!categoryId) return

		modals.openConfirmModal({
			modalId: ModalType.CONFIRM_DELETE_CATEGORY,
			size: 380,
			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите удалить категорию?
				</Text>
			),
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			onConfirm: () => mutate(categoryId),
		})
	}

	return (
		<ActionIcon variant="white" className="group" onClick={handleConfirm}>
			<FaRegTrashAlt className="text-gray-600 group-hover:text-red-600 transition" />
		</ActionIcon>
	)
}
