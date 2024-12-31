import { ActionIcon, Text } from '@mantine/core'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Props } from './types'
import { ModalType } from '@/shared/lib/config'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useDeleteLayout } from '@/entities/layouts'

export const DeleteLayoutFeature: FC<Props> = ({ layoutId }) => {
	const { mutate } = useDeleteLayout(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Оформление',
				message: 'Оформление успешно удалено',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Оформление',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const handleConfirm = () => {
		if (!layoutId) return

		modals.openConfirmModal({
			modalId: ModalType.CONFIRM_DELETE_LAYOUT,
			size: 380,
			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите удалить оформление?
				</Text>
			),
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			onConfirm: () => mutate(layoutId),
		})
	}

	return (
		<ActionIcon variant="white" className="group" onClick={handleConfirm}>
			<FaRegTrashAlt className="text-gray-600 group-hover:text-red-600 transition" />
		</ActionIcon>
	)
}
