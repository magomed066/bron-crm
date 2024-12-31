import { ActionIcon, Text } from '@mantine/core'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Props } from './types'
import { ModalType } from '@/shared/lib/config'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useDeleteMaterial } from '@/entities/materials'

export const DeleteMaterialFeature: FC<Props> = ({ materialId }) => {
	const { mutate } = useDeleteMaterial(() => {
		notifications.show({
			color: 'green',
			autoClose: 2500,
			title: 'Материалы',
			message: 'Материал успешно удалена',
		})
	})

	const handleConfirm = () => {
		if (!materialId) return

		modals.openConfirmModal({
			modalId: ModalType.CONFIRM_DELETE_MATERIAL,
			size: 380,
			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите удалить материал?
				</Text>
			),
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			onConfirm: () => mutate(materialId),
		})
	}

	return (
		<ActionIcon variant="white" className="group" onClick={handleConfirm}>
			<FaRegTrashAlt className="text-gray-600 group-hover:text-red-600 transition" />
		</ActionIcon>
	)
}
